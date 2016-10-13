'use strict';
describe('Invoice test cases',function(){
	var invoice_home_page = require('../page/invoice_home_page.js');
	var test_data = require('../Files/data.json');
	
	beforeEach(function(){
		browser.get('http://metaware.github.io/angular-invoicing');
		browser.driver.manage().window().maximize();
		
	});
	
	// This test case check the header and Footer text.
	it('Check Header and Footer Text',function(){
		expect(invoice_home_page.getHeaderText()).toBe(test_data.header);
		expect(invoice_home_page.getFooterText()).toBe(test_data.footer);
	});
	
	// This test case uploads a logo and check hide/show link functionality.
	it('Upload logo image and test hide/show logo',function(){
		invoice_home_page.changeLogo('C:\\Protractor_Invoice\\Files\\integrantLogo.png');

		invoice_home_page.clickHideOrShowLogo();
		expect(invoice_home_page.getHideOrShowLogoLinkText()).toBe('Show logo');

		invoice_home_page.clickHideOrShowLogo();
		expect(invoice_home_page.getHideOrShowLogoLinkText()).toBe('Hide logo');
	});

	// This test case check Turn on/off print mode button
	it('Check print mode',function(){
		invoice_home_page.TurnOnPrintMode();
		expect(invoice_home_page.getTurnOnPrintModeButton().isDisplayed()).toBeFalsy();
		expect(invoice_home_page.getTurnOffPrintModeButton().isDisplayed()).toBeTruthy();

		invoice_home_page.TurnOffPrintMode();
		expect(invoice_home_page.getTurnOnPrintModeButton().isDisplayed()).toBeTruthy();
		expect(invoice_home_page.getTurnOffPrintModeButton().isDisplayed()).toBeFalsy();;
	});
	
	describe('Invoice detailed test cases',function(){
		
		beforeEach(function(){
			invoice_home_page.Reset();
			invoice_home_page.removeItems();
			invoice_home_page.clearData();
		});
		
		// This test case fill in all required data and check the calculations
		it('Fill in invoice data and Check totals for one product',function(){
			
			invoice_home_page.setInvoiceNumber(test_data.invoiceNumber);
			
			invoice_home_page.fillInInvoiceCustomerInfo(test_data.customerName,test_data.customerWeblink,test_data.customerAddress1,test_data.customerAddress2,test_data.customerPostal,test_data.currency);
			
			invoice_home_page.fillInCompanyInfo(test_data.companyName,test_data.companyWeblink,test_data.companyAddress1,test_data.companyAddress2,test_data.companyPostal);
			
			invoice_home_page.addProduct(test_data.productName,test_data.quantity,test_data.cost);
			
			invoice_home_page.setTaxPercentage(test_data.tax);
			
			// calculate expected total, expectedSubTotal, expectedGrandTotal  from values eneterd above and convert it to 2 decimal places
			var expectedTotal = parseFloat(test_data.quantity * test_data.cost).toFixed(2);
			var expectedSubTotal = parseFloat(expectedTotal).toFixed(2);
			var expectedGrandTotal = parseFloat(expectedSubTotal  * ((test_data.tax/100)+1)).toFixed(2);
			
			// Add the currency sign to the total, subTotal, GrandTotals strings
			var expectedTotalString = invoice_home_page.getStringValueWithCurrencySign(expectedTotal,test_data.currency);
			var expectedSubTotalString = invoice_home_page.getStringValueWithCurrencySign(expectedSubTotal,test_data.currency);
			var expectedGrandTotalString = invoice_home_page.getStringValueWithCurrencySign(expectedGrandTotal,test_data.currency);
			
			// Compare expected to Actual Values
			var actualTotal = invoice_home_page.getActualTotal();
			expect(actualTotal).toBe(expectedTotalString);
			
			var actualSubTotal = invoice_home_page.getActualSubTotal();
			expect(actualSubTotal).toBe(expectedSubTotalString);
			
			var actualGrandTotal = invoice_home_page.getActualGrandTotal();
			expect(actualGrandTotal).toBe(expectedGrandTotalString);
			
		});
		
		
	});
});