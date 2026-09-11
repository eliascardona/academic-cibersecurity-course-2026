# Exercise: Network Troubleshooting Lab with Docker

## Objectives

By the end of this exercise, students should be able to:

1. Verify IPv4 and IPv6 connectivity using `ping`.
2. Analyze network routes using `traceroute` for both IPv4 and IPv6.
3. Resolve DNS names using `nslookup`.
4. Run an HTTP web server inside a Docker container.
5. Access the web server from the host computer using `curl`.
6. Capture and analyze HTTP traffic using `tcpdump` and `tshark`.
7. Use `iptables` to block traffic to port `80`.
8. Determine, through packet capture, whether an HTTP request:

   * reaches the server,
   * is rejected, or
   * stops receiving a response.
9. Explain the difference between **"the client sent the packet"** and **"the server received and processed the connection."**

---

## Deliverables

Submit **one YouTube video** demonstrating the complete exercise.

The video must include:

* IPv4 `ping`
* IPv6 `ping`
* IPv4 `traceroute`
* IPv6 `traceroute`
* `nslookup`
* Docker HTTP server
* Successful `curl` request
* `tcpdump` capture
* `tshark` capture
* `iptables` configuration
* Failed `curl` request after applying the firewall rule
* Packet capture showing what happens to the blocked connection
* Comparison between `DROP` and `REJECT`

### Recording Requirements

Record the exercise using **OBS Studio**:

https://obsproject.com/

The recording must show:

* Your computer screen.
* The terminal(s) used during the exercise.
* Your camera feed.
* Your voice explaining the commands, results, and analysis. (this is optional)

The objective is not only to demonstrate that the commands work, but to **explain what is happening at the network level and support your conclusions with packet-capture evidence**.

