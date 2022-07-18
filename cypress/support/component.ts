// TODO: source the example support file
import "@cypress/code-coverage/support";
import 'todomvc-app-css/index.css';
import './commands'

import { mount } from 'cypress/react';

Cypress.Commands.add('mount', mount);