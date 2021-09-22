"use strict";
import disableAutocomplete from './disable-autocomplete.js';
import customSelect from './custom-select.js';
import header from './header.js';
import form from './form.js';

document.addEventListener("DOMContentLoaded", function () {
	disableAutocomplete();
	header();
	customSelect();
	form();
});