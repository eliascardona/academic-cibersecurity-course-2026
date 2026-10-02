import { LDAPLoginForm } from "./components/form-field.js";

const appWrapper = document.getElementById('app_wrapper');
const appContent = document.createElement('div');

appContent.append(LDAPLoginForm())
appWrapper.append(appContent)
