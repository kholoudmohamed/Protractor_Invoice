var invoice_home_page = function(){
	
	this.getHeaderText = function(){
		return element(by.css('.col-xs-12.heading')).getText();
	};
	
	this.setInvoiceNumber = function(invoice_number){
		element(by.model('invoice.invoice_number')).sendKeys(invoice_number);
	};
	
	this.clickHideOrShowLogo = function(){
		element(by.id('remove_logo')).click();
	};

	this.getHideOrShowLogoLinkText = function(){
		return element(by.id('remove_logo')).getText();
	};
	
	this.changeLogo = function(logo_path){

		browser.executeScript("document.getElementById('imgInp').style.display='block'");
		element(by.id('imgInp')).sendKeys(logo_path);
		browser.executeScript("document.getElementById('imgInp').style.display='none'");
	};
	
	this.fillInInvoiceCustomerInfo = function(customer_name, customer_web_link, customer_address1, customer_address2, customer_postal, customer_currency){
		element(by.model('invoice.customer_info.name')).sendKeys(customer_name);
		element(by.model('invoice.customer_info.web_link')).sendKeys(customer_web_link);
		element(by.model('invoice.customer_info.address1')).sendKeys(customer_address1);
		element(by.model('invoice.customer_info.address2')).sendKeys(customer_address2);
		element(by.model('invoice.customer_info.postal')).sendKeys(customer_postal);
		element(by.model('currencySymbol')).$('[label= "' + customer_currency + '"]').click();
		
	};
	
	this.fillInCompanyInfo = function(company_name,company_web_link, company_address1, company_address2, company_postal ){
		element(by.model('invoice.company_info.name')).sendKeys(company_name);
		element(by.model('invoice.company_info.web_link')).sendKeys(company_web_link);
		element(by.model('invoice.company_info.address1')).sendKeys(company_address1);
		element(by.model('invoice.company_info.address2')).sendKeys(company_address2);
		element(by.model('invoice.company_info.postal')).sendKeys(company_postal);
		
	};
	
	this.removeItems = function(){
		element(by.css('[ng-click="removeItem(item)"]')).click();
	};
	
	this.addProduct = function(item_description, item_quantity,item_cost ){
		element(by.css('[ng-click="addItem()"]')).click();
		
		element(by.model('item.description')).clear();
		element(by.model('item.qty')).clear();
		element(by.model('item.cost')).clear();
		
		element(by.model('item.description')).sendKeys(item_description);
		element(by.model('item.qty')).sendKeys(item_quantity);
		element(by.model('item.cost')).sendKeys(item_cost);
		
	};

	this.setTaxPercentage = function(tax_value){
		element(by.model('invoice.tax')).sendKeys(tax_value);
	};
	
	this.getCurrentQuantity = function(){
		return element(by.model('item.qty')).getAttribute('value');
	};
	
	this.getCurrentCost = function(){
		return element(by.model('item.cost')).getAttribute('value');
	};
	
	this.getCurrentTax = function(){
		return element(by.model('invoice.tax')).getAttribute('value');
	};
	
	
	this.getActualTotal = function(){
		return element.all(by.css('.col-xs-2.text-right.ng-binding')).first().getText();
	};
	
	
	this.getActualSubTotal = function(){
		return element.all(by.css('.col-xs-2.text-right.ng-binding')).get(1).getText();
	};
	
	this.getActualGrandTotal = function(){
		return element.all(by.css('.col-xs-2.text-right.ng-binding')).last().getText();
	};
	
	
	this.getStringValueWithCurrencySign = function(value, currency){
		var init = currency.indexOf('(');
		var fin = currency.indexOf(')');
		var currencySign = currency.substr(init+1,fin-init-1);
		
		var valueString = value.toString();
		
		return currencySign+valueString;
	};
	
	this.Reset = function(){
		element(by.css('[ng-click="clearLocalStorage()"]')).click();
		browser.switchTo().alert().accept();
	};
	
	this.TurnOnPrintMode = function(){
		element(by.css('[ng-click="printMode = true;"]')).click();
	};

	this.getTurnOnPrintModeButton = function(){
		return element(by.css('[ng-click="printMode = true;"]'));
	};
	
	this.TurnOffPrintMode = function(){
		element(by.css('[ng-click="printMode = false;"]')).click();
	};
	
	this.getTurnOffPrintModeButton = function(){
		return element(by.css('[ng-click="printMode = false;"]'));
	};

	this.clearData = function(){
		// clear invoice # number
		element(by.id('invoice-number')).clear();
		//clear customer information
		element(by.model('invoice.customer_info.name')).clear();
		element(by.model('invoice.customer_info.web_link')).clear();
		element(by.model('invoice.customer_info.address1')).clear();
		element(by.model('invoice.customer_info.address2')).clear();
		element(by.model('invoice.customer_info.postal')).clear();
		//clear company information
		element(by.model('invoice.company_info.name')).clear();
		element(by.model('invoice.company_info.web_link')).clear();
		element(by.model('invoice.company_info.address1')).clear();
		element(by.model('invoice.company_info.address2')).clear();
		element(by.model('invoice.company_info.postal')).clear();
		//clear Tax(%)
		element(by.model('invoice.tax')).clear();
	};
	
	this.getFooterText = function(){
		return element(by.css('.copy.noPrint')).getText();
	};
	
};

module.exports = new invoice_home_page();