# Wireshark Network Lab — Docker Exercise

##  Build the Image

From the directory containing the `Dockerfile`:

```bash
docker build -t network-wireshark-lab .
```

Verify that the image was created:

```bash
docker images | grep network-wireshark-lab
```

---

#  Start the Container

For this exercise, use:

```bash
docker run -it \
  --name network-lab \
  --cap-add=NET_ADMIN \
  --cap-add=NET_RAW \
  network-wireshark-lab
```

You should now be inside the container:

```text
root@xxxxxxxx:/lab#
```

---

#  Verify the Network

Start by inspecting the network interfaces:

```bash
ip addr
```

You should see an interface such as:

```text
eth0
```

with an IP address.

Next, inspect the routing table:

```bash
ip route
```

You should see something similar to:

```text
default via 172.17.0.1 dev eth0
172.17.0.0/16 dev eth0 proto kernel scope link src 172.17.0.2
```

Check the neighbor table:

```bash
ip neigh
```

---

#  Test Connectivity

Test Internet connectivity using ICMP:

```bash
ping -c 4 8.8.8.8
```

Expected output should be similar to:

```text
4 packets transmitted, 4 received, 0% packet loss
```

Then run `traceroute`:

```bash
traceroute 8.8.8.8
```

Finally, test DNS resolution:

```bash
nslookup www.google.com
```

---

#  Capture Packets with TShark

You can see the available network interfaces with:

```bash
tshark -D
```

Typically, you may see:

```text
1. eth0
2. any
3. lo
```

Start a packet capture on `eth0`:

```bash
tshark -i eth0
```

Leave this terminal running.

Open another terminal and connect to the running container:

```bash
docker exec -it network-lab bash
```

Then generate ICMP traffic:

```bash
ping -c 4 8.8.8.8
```

You should see ICMP traffic in the TShark capture.

---

#  Capture Only ICMP

Start a capture using an ICMP filter:

```bash
tshark -i eth0 -f "icmp"
```

Then, from another terminal:

```bash
ping -c 4 8.8.8.8
```

You should see traffic similar to:

```text
ICMP Echo request
ICMP Echo reply
```

The communication can be represented as:

```text
Your container
      |
      | ICMP Echo Request
      ↓
   8.8.8.8
      |
      | ICMP Echo Reply
      ↓
Your container
```

---

#  Capture DNS

Start a capture for DNS traffic:

```bash
tshark -i eth0 -f "port 53"
```

Then execute:

```bash
nslookup example.com
```

You should see DNS traffic.

To make the output easier to understand, use:

```bash
tshark -i eth0 -Y "dns" \
  -T fields \
  -e ip.src \
  -e ip.dst \
  -e dns.qry.name \
  -e dns.qry.type
```

This allows you to identify:

* Source IP
* Destination IP
* DNS query name
* DNS query type

---

#  Capture Traceroute

Start a capture for ICMP and UDP traffic:

```bash
tshark -i eth0 -f "icmp or udp"
```

Then run:

```bash
traceroute 8.8.8.8
```

Look for traffic such as:

```text
UDP
ICMP Time Exceeded
```

Depending on the `traceroute` implementation and network configuration, the exact packets may differ.

The basic mechanism is:

```text
TTL = 1
   ↓
Router 1
   ↓
ICMP Time Exceeded

TTL = 2
   ↓
Router 2
   ↓
ICMP Time Exceeded

TTL = 3
   ↓
Router 3
   ↓
ICMP Time Exceeded

...
```

---

#  Analyze ARP

Start a capture for ARP:

```bash
tshark -i eth0 -f "arp"
```

Then generate traffic to the Docker gateway.

First determine the gateway:

```bash
ip route
```

For example:

```text
default via 172.17.0.1 dev eth0
```

Then ping the gateway:

```bash
ping -c 4 172.17.0.1
```

You may see ARP traffic similar to:

```text
ARP Who has 172.17.0.1?
ARP 172.17.0.1 is at xx:xx:xx:xx:xx:xx
```

Finally, inspect the neighbor table:

```bash
ip neigh
```

The relationship students should identify is:

```text
IP Address
     ↓
   ARP
     ↓
MAC Address
```

This demonstrates how IPv4 hosts discover the Layer 2 MAC address associated with an IP address on the local network.

---
---
---


# IPv6 and Neighbor Discovery Protocol (NDP) — Docker Lab Exercise

## 1. Objective

In this exercise, you will use Docker and Linux networking tools to understand how **IPv6 Neighbor Discovery Protocol (NDP)** works.

You will learn how to:

* Create an IPv6-enabled Docker network.
* Inspect IPv6 addresses and routes.
* Discover IPv6 neighbors.
* Generate and capture **Neighbor Solicitation (NS)** messages.
* Observe **Neighbor Advertisement (NA)** messages.
* Observe **Router Solicitation (RS)** and **Router Advertisement (RA)** messages.
* Inspect the IPv6 neighbor cache.
* Analyze ICMPv6 packets using `tcpdump` and `tshark`.
* Understand the role of NDP in IPv6 communication.
* Identify potential security issues associated with NDP.

---

# 2. Requirements

You need:

* Docker installed.
* The provided Dockerfile.
* Two terminal windows.
* Basic knowledge of Docker and Linux commands.

The Docker image contains:

* `iproute2`
* `iputils-ping`
* `tcpdump`
* `tshark`
* `traceroute`
* `dnsutils`
* `curl`
* `net-tools`

---

# 3. Build the Docker Image

From the directory containing the Dockerfile:

```bash
docker build -t ipv6-ndp-lab .
```

Verify that the image was created:

```bash
docker images | grep ipv6-ndp-lab
```

---

# 4. Create an IPv6 Docker Network

Create a Docker bridge network with IPv6 enabled:

```bash
docker network create \
  --ipv6 \
  --subnet 2001:db8:100::/64 \
  ipv6-lab
```
This needs to be executed only one time. 

Verify the network:

```bash
docker network inspect ipv6-lab
```

You should see an IPv6 subnet similar to:

```text
2001:db8:100::/64
```

> `2001:db8::/32` is reserved for documentation and examples, making it appropriate for this lab.

---

# 5. Start the First Container

Start container `host1`:

```bash
docker run -it \
  --name host1 \
  --network ipv6-lab \
  --cap-add=NET_ADMIN \
  --cap-add=NET_RAW \
  ipv6-ndp-lab```

Inside the container, inspect the interfaces:

```bash
ip addr
```

You should see an IPv6 address associated with `eth0`.

For example:

```text
inet6 2001:db8:100::2/64
```

The exact address may be different.

---

# 6. Start the Second Container

Open a second terminal on your host and execute:

```bash
docker run -it \
  --name host2 \
  --network ipv6-lab \
  ipv6-ndp-lab
```

Inspect the network configuration:

```bash
ip addr
```

Identify the IPv6 address assigned to `eth0`.

For example:

```text
inet6 2001:db8:100::3/64
```

---

# 7. Inspect the IPv6 Routing Table

Inside `host1`, execute:

```bash
ip -6 route
```

You should see a route associated with the IPv6 network:

```text
2001:db8:100::/64 dev eth0
```

Also inspect the default route:

```bash
ip -6 route show default
```

---

# 8. Inspect the Neighbor Table

In order to have a neigh value in the first terminal execute this ; 

```bash
ping -6 2001:db8:100::3
```

In the second terminal do this : 
```bash
tcpdump -i eth0 -nn -vv 'icmp6'
```

Then run this:

```bash
ip -6 neigh
```

The command displays the IPv6 neighbor cache.

You may see something similar to:

```text
2001:db8:100::3 dev eth0 lladdr 02:42:ac:... REACHABLE
```

The neighbor table maps IPv6 addresses to link-layer/MAC addresses.


---

# 9. Clear the Neighbor Cache

To observe Neighbor Discovery from the beginning, remove the existing neighbor entry:

```bash
ip -6 neigh flush dev eth0
```

Verify:

```bash
ip -6 neigh
```



---

# 10. Generate IPv6 Traffic

From `host1`, ping `host2` using its IPv6 address:

For example:

```bash
ping -6 2001:db8:100::3
```

Stop the command after several packets:

```text
Ctrl+C
```

Now inspect the neighbor table again:

```bash
ip -6 neigh
```

You should now see an entry for `host2`.

---

# 11. Observe Neighbor Discovery with tcpdump

Clear the neighbor cache again:

```bash
ip -6 neigh flush dev eth0
```


---

# 12. Capture Only Neighbor Discovery Traffic

Run:

```bash
tcpdump -i eth0 -nn -vv 'icmp6 and (ip6[40] == 135 or ip6[40] == 136)'
```

ICMPv6 message types:

| Type | Message                |
| ---: | ---------------------- |
|  135 | Neighbor Solicitation  |
|  136 | Neighbor Advertisement |

Generate traffic again:

```bash
ping -6 2001:db8:100::3
```

Observe the exchange.

The expected logical sequence is:

```text
Host 1
  |
  | Neighbor Solicitation
  |---------------------------->
  |
  | Neighbor Advertisement
  |<----------------------------
  |
  | ICMPv6 Echo Request
  |---------------------------->
  |
  | ICMPv6 Echo Reply
  |<----------------------------
  |
Host 2
```

---


# 13. Use tshark to Analyze NDP

Instead of `tcpdump`, use `tshark`.

Run:

```bash
tshark -i eth0 -f "icmp6"
```

Generate traffic:

```bash
ping -6 2001:db8:100::3
```

# IP Addresses for Connectivity Testing (Ping)

## Public DNS Servers

| Provider | IPv4 Address | IPv6 Address |
| :--- | :--- | :--- |
| **Cloudflare** | `1.1.1.1` <br> `1.0.0.1` | `2606:4700:4700::1111` <br> `2606:4700:4700::1001` |
| **Google** | `8.8.8.8` <br> `8.8.4.4` | `2001:4860:4860::8888` <br> `2001:4860:4860::8844` |
| **Quad9** | `9.9.9.9` <br> `149.112.112.112` | `2620:fe::fe` <br> `2620:fe::9` |
| **OpenDNS (Cisco)** | `208.67.222.222` <br> `208.67.220.220` | `2620:119:35::35` <br> `2620:119:53::53` |

---

In order to run this : 

docker network create --ipv6 --subnet=fd00:10::/64 lab_ipv6_net

docker build -t lab-image .

docker run --rm -it --network=lab_ipv6_net lab-image


Terminal 1
docker run --rm -it \
  --name target-node \
  --network=lab_ipv6_net \
  lab-image


Terminal 2
docker run --rm -it \
  --cap-add=NET_ADMIN \
  --cap-add=NET_RAW \
  --network=lab_ipv6_net \
  lab-image tshark -i eth0 -f "icmp6"


Terminal 3
docker run --rm -it \
  --network=lab_ipv6_net \
  lab-image ping -6 fd00:10::2
