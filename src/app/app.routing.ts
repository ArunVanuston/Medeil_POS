import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { VanustondocComponent } from './vanustondoc/vanustondoc.component';
export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: "/userlogin/login",
      pathMatch: 'full'
    }, {
      path: 'Dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
      path: 'DoctorRegistration',
      loadChildren: './doctor/doctor.module#DoctorModule'
    }, {
      path: 'Edition',
      loadChildren: './edition/edition.module#EditionModule'
    }, {
      path: 'Role',
      loadChildren: './role/role.module#RoleModule'
    }, {
      path: 'Domain',
      loadChildren: './domain/domain.module#DomainModule'
    }, {
      path: 'SubDomain',
      loadChildren: './subdomain/subdomain.module#SubdomainModule'
    }, {
      path: 'User',
      loadChildren: './users/users.module#UsersModule'
    }, {
      path: 'user',
      loadChildren: './user/user.module#UserModule'
    }, {
      path: 'ShopRegistration',
      loadChildren: './shopinfo/shopinfoModule.module#ShopModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './shopinfo/shopinfoModule.module#ShopModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './branchInfo/branchInfoModule.module#BranchModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './hospitalform/hospitalform.module#HospitalformModule'
    }, {
      path: 'SalesOrder',
      loadChildren: './salesordernew/salesordernew.module#salesOrderModulenew'
    }, {
      path: 'HospitalRegistration',
      loadChildren: './hospitalform/hospitalform.module#HospitalformModule'
    }, {
      path: 'Module',
      loadChildren: './usersetting/usersetting.module#AddModules'
    }, {
      path: 'StockEntryForm',
      loadChildren: './stocks/stocks.module#StocksModule'
    },
    {
      path: 'ViewStockList',
      loadChildren: './stocks/stocks.module#StocksModule'
    }, {
      path: 'Stock',
      loadChildren: './stocks/stocks.module#StocksModule'
    }, {
      path: 'SubModule',
      loadChildren: './submodules/submodules.module#Submodulesserv'
    }, {
      path: 'PurchaseDue',
      loadChildren: './purchaseDue/purchaseApproval.module#purchaseApprovalModule'
    }, {
      path: 'DamageStock',
      loadChildren: './damagestock/damagestock.module#DamagestockModule'
    }, {
      path: 'Product',
      loadChildren: './product/product.module#ProductModule'
    }, {
      path: 'EmployeeRegister',
      loadChildren: './employeeinfo/emp.module#empModule'
    }, {
      path: 'BranchRegistration',
      loadChildren: './branchInfo/branchInfoModule.module#BranchModule'
    }, {
      path: 'PurchaseOrder',
      loadChildren: './Purchase/purchase.module#PurchaseModule'
    }, {
      path: 'ProductMaster',
      loadChildren: './drugmaster/drugmaster.module#drugModule'
    },
    {
      path: 'ViewDrugList',
      loadChildren: './drugmaster/drugmaster.module#drugModule'
    }, {
      path: 'VanustonProductMaster',
      loadChildren: './vanustondrugmaster/vanustondrugmaster.module#VanustonDrugModule'
    }, {
      path: 'PurchaseInvoice',
      loadChildren: './purchaseInvoice/purchaseInvoice.module#invoiceModule'
    }, {
      path: 'PatientAlert',
      loadChildren: './patientAlert/PatientAlert.module#PatientAlertmodule'
    },

    //Sabarish
    {
      path: 'TaxSettings',
      loadChildren: './taxsettings/taxsettings.module#TaxsettingsModule'
    },
    {
      path: 'CurrencySetting',
      loadChildren: './currencysetting/currencysetting.module#CurrencysettingsModule'
    },


    {
      path: 'TaskManagement',
      loadChildren: './taskmanagement/taskmanagement.module#TaskManagementModule'
    },

    //santhosh
    {
      path:'VanustonDocuments',
      component:VanustondocComponent,
      data: {
        breadcrumb: 'vanuston Document',                   
    }
    },

    //Gokul
    {
      path: 'SalesReports',
      loadChildren: './reports/salesreports/report.module#reportModule'
    }, {
      path: 'PurchaseReports',
      loadChildren: './reports/purchasereports/report.module#reportModule'
    }, {
      path: 'AdminReports',
      loadChildren: './reports/adminreports/report.module#reportModule'
    }, {
      path: 'DoctorReports',
      loadChildren: './reports/doctorreports/report.module#reportModule'
    }, {
      path: 'HRMSReports',
      loadChildren: './reports/hrmsreports/report.module#reportModule'
    }, {
      path: 'InventoryReports',
      loadChildren: './reports/inventoryreports/report.module#reportModule'
    }, {
      path: 'VendorReports',
      loadChildren: './reports/vendorreports/report.module#reportModule'
    }, {
      path: 'CRMReports',
      loadChildren: './reports/crmreports/report.module#reportModule'
    }, {
      path: 'StockReports',
      loadChildren: './reports/stockreports/report.module#reportModule'
    },
    {
      path: 'AuditReports',
      loadChildren: './reports/stockreports/report.module#reportModule'
    },{
      path: 'QCReports',
      loadChildren: './reports/stockreports/report.module#reportModule'
    },
    {
      path: 'ProductReports',
      loadChildren:'./reports/productreports/productreports.module#ProductsreportModule'

    },

    //sankar
    {
      path: 'HQReport',
      loadChildren: './reports/hqreport/hqreport.module#hqReportModule'
    },
    {
      path: 'AccountReports',
      loadChildren: './reports/accountreports/report.module#reportModule'
    },

    {
      path: 'Plan',
      loadChildren: './plan/plan.module#PlanModule'
    },

    {
      path: 'ShopRegistration/Billing',
      loadChildren: './billing/billing.module#billingModule'
    },
    {
      path: 'decimalSettings',
      loadChildren: './decimalsetting/decimalsetting.module#DecimalsettModule'
    },
    {
      path: 'finacialsettings',
      loadChildren: './finacialsettings/finacialsettings.module#FinacialsettModule'
    },
    {
      path: 'setupcostsettings',
      loadChildren: './setupcostsettings/setupcostsettings.module#SetupcostModule'
    },
    {
      path: 'Payment',
      loadChildren: './paymentoutstanding/paymentoutstanding.module#paymentoutstandingModule'
    },
    //Gayathri
    {
      path: 'Insurence',
      loadChildren: './insurence/insurence.module#insurenceModule'
    },
    {
      path: 'Policy',
      loadChildren: './policy/policy.module#policyModule'
    },
    //Raja
    {
      path: 'BannedDrug',
      loadChildren:'./banneddruglist/banneddruglist.module#BanneddrugModule'

    },
    {
      path: 'AssignHsnCode',
      loadChildren: './hsncode/hsncode.module#HsncodeModule'
    },
    {
      path: 'ServiceCode',
      loadChildren: './soacode/soacode.module#SoacodeModule'
    },
    {
      path: 'PharmacistRegistration',
      loadChildren: './pharmacist-reg/pharmacistreg.module#PharmacistregModule'

    },
    {
      path: 'ScheduleList',
      loadChildren: './schedulelist/schedulelist.module#SchedulelistModule'

    },

    {
      path: 'PharmacistRegReport',
      loadChildren: './reports/pharmacistregreport/pharmacistreport.module#pharmacistreportModule'
    },
    {
      path: 'ShortExpiry',
      loadChildren: './shortexpiry/shortexpiry.module#ShortexpiryModule'
    }, {
      path: 'Loyalty',
      loadChildren: './loyalitypoints/loyalitypoints.module#LoyalityModule'
    },
    {
      path: 'SecurityMonitoring',
      loadChildren: './securitymonitoring/securitymonitoring.module#securitymonitoringModule'
    },
    {
      path: 'PurchaseDeliveryChallan',
      loadChildren: './newpurchasedeliverychallan/newpurchasedeliverychallan.module#NewpurchasedeliverychallanModule'
    },
    {
      path: 'BonusLoyalty',
      loadChildren: './loyalitybonus/loyalitybonus.module#BonusLoyalityModule'
    },
    {
      path: 'CustomerType',
      loadChildren: './loyalitycusttype/loyalitycusttype.module#LoyalitycusttypeModule'
    },

    {
      path: 'BonusLoyalty',
      loadChildren: './loyalitybonus/loyalitybonus.module#BonusLoyalityModule'
    },
    {
      path: 'UserListReports',
      loadChildren: './reports/userrolereports/userrole.module#UserroleModule'
    },
    {
      path: 'LoyaltyReport',
      loadChildren: './reports/loyaltyreports/loyalty.module#LoyaltyModule'
    },
    {
      path: 'SalesReports',
      loadChildren: './reports/gst1/gst1.module#Gst1Module'
    },
    {
      path: 'PurchaseReports',
      loadChildren: './reports/gstr2/gstr2.module#Gst2Module'
    },
    // {
    //   path: 'GSTR3BReports',
    //   loadChildren: './reports/gstr3b/gstr3b.module#Gstr3bModule'
    // },
    {
      path: 'TaxationReports',
      loadChildren: './reports/gst1/gst1.module#Gst1Module'
      
     },
    {
      path: 'TaxationReports',
      loadChildren: './reports/gstr2/gstr2.module#Gst2Module'
    },
    {
      path: 'TaxationReports',
      loadChildren: './reports/gstr3b/gstr3b.module#Gstr3bModule'
    },
    {
      path: 'DrugQualityController',
      loadChildren: './drugqc/drugqc.module#DrugqcModule'
    },
    {
      path: 'DrugQualityAccess',
      loadChildren: './drugqa/drugqa.module#DrugqaModule'
    },

    //kishor


    {
      path: 'UserActivity',
      loadChildren: './useractivity/useractivity.module#UserActivityModule'
    },
    {
      path: 'UserAudit',
      loadChildren: './useractivity/useractivity.module#UserActivityModule'
    },
    {
      path: 'EmployeeTrack',
      loadChildren: './useractivity/useractivity.module#UserActivityModule'
    },
    // Raja

    //Puthiran
    {
      path: 'CustomizeForms',
      loadChildren: './customizeformassign/customizeformassign.module#customizeformModule'
    },
    {
      path: 'Password',
      loadChildren: './authentication/authentication.module#AuthenticationModule'
    }, 
    {
      path: 'Profileinfo',
      loadChildren: 'app/layouts/profileinfo/profileinfo.module#ProfileInfoModule'
    },

    {
      path: 'PickingReports',
      loadChildren: './reports/pickingreports/pickingreports.module#pickreportModule'
    },
    {
      path: 'PackingReports',
      loadChildren: './reports/packingreports/packingreports.module#packreportModule'
    },
    {
      path: 'GeneralSettings',
      loadChildren: './generalsettings/generalsettings.module#generalsettingsModule'
    }, {
      path: 'psettings',
      loadChildren: './printqrsettings/printqrsettings.module#PrintqrsettingsModule'
    }, {
      path: 'barcodesetting',
      loadChildren: './barcodesettings/barcodesettings.module#BarcodeSettingsModule'
    }, {
      path: 'SmsSetting',
      loadChildren: './smssettings/smssettings.module#smssettingsModule'
    }, {
      path: 'EmailSetting',
      loadChildren: './emailsettings/emailsettings.module#emailsettingsModule'
    }, {
      path: 'qrcodesetting',
      loadChildren: './qrcodesettings/qrcodesettings.module#QrcodeSettingsModule'
    }, {
      path: 'rightpanel',
      loadChildren: './rightpanel/rightpanel.module#RightPanelModule'
    }, {
      path: 'RazorPayments',
      loadChildren: './paymenttrialforms/paymenttrialforms.module#PaymentTrialModule'
    }, {
      path: 'addons',
      loadChildren: './addons/addons.module#addonsModule'
    },
    {
      path: 'ranking',
      loadChildren: './moduleranking/moduleranking.module#RankingModule'
    },{
      path: 'Notify',
      loadChildren: './bellnotify/bellnotify.module#bellnotifyModule'
    },
    {
      path: 'ManualBilling',
      loadChildren: './manualbilling/manualbilling.module#ManualbillingModule'
    },

    //Mani
    {
      path: 'StockChecking',
      loadChildren: './stockCheck/stockCheck.module#stockCheck'
    },


    {
      path: 'SalesDeliveryReceipt',
      loadChildren: './salesDeliveryChallan/salesDeliveryChallan.module#salesDeliveryChallanModule'
    },
    {
      path:'PrescriptionDGT',
      loadChildren: './practisemgmnt/practisemgmnt.module#PractiseassignModule'
    },

    //prasad
    {
      path: 'Patient',
      loadChildren: './regform/patient/patient.module#PatientModule'
    }, {
      path: 'CustomerRegistration',
      loadChildren: './regform/customer/customer.module#customerModule'
    }, {
      path: 'Manufacturer',
      loadChildren: './regform/pharmacompany/companypharma.module#CompanypharmaModule'
    }, {
      path: 'ReorderForm',
      loadChildren: './inventory/stkminqty/stkminqty.module#stkminqtyModule'
    }, {
      path: 'VendorRegistration',
      loadChildren: './regform/distributor/distributor.module#DistributorModule'
    }, {
      path: 'VendorwiseProduct',
      loadChildren: './regform/distwiseproduct/distprod.module#distprodModule'
    },

    {
      path: 'TaskManagement',
      loadChildren: './usertask/usertask.module#UsertaskModule'
    },




    {
      path: 'StockAdjustment',
      loadChildren: './inventory/stockadjustment/stockadjustment.module#stockadjustmentModule'
    }, {
      path: 'ExpiredStock',
      loadChildren: './inventory/stockexpiry/stockexpiry.module#stockexpiryModule'
    }, {
      path: 'SalesDummy',
      loadChildren: './sales/salesdummy/salesdummy.module#salesdummyModule'
    }, {
      path: 'SalesInvoice',
      loadChildren: './sales/salesinvoice/salesinvoice.module#salesinvoiceModule'
    }, {
      path: 'SalesReturn',
      loadChildren: './sales/salesreturn/salesreturn.module#salesreturnModule'
    }, {
      path: 'QuotateInvoice',
      loadChildren: './sales/salesmaintain/salesmaintain.module#salesmaintainModule'
    },

    {
      path: 'GeneralJournal',
      loadChildren: './accounts/genjournal/genjournal.module#genjournalModule'
    },


    {
      path: 'Ledger',
      loadChildren: './accounts/ledger/ledger.module#ledgerModule'
    }, {
      path: 'Accounts',
      loadChildren: './accounts/accounts/accounts.module#accountsModule'
    }, {
      path: 'DayBook',
      loadChildren: './accounts/daybook/daybook.module#daybookModule'
    }, {
      path: 'PurchaseJournal',
      loadChildren: './accounts/purchjournal/pchjournal.module#pchjournalModule'
    }, {
      path: 'SalesJournal',
      loadChildren: './accounts/sjournal/sjournal.module#sjournalModule'
    }, {
      path: 'CreditNote',
      loadChildren: './accounts/creditNote/creditNote.module#creditNoteModule'
    }, {
      path: 'Payment',
      loadChildren: './accounts/payments/payment.module#paymentModule'
    }, {
      path: 'DebitNote',
      loadChildren: './accounts/debitNote/debitNote.module#debitNoteModule'
    }, {
      path: 'Receipt',
      loadChildren: './accounts/receipts/receipts.module#receiptsModule'
    }, {
      path: 'BalanceSheet',
      loadChildren: './accounts/balancesheet/blncesheet.module#blncesheetModule'
    }, {
      path: 'CashflowStatement',
      loadChildren: './accounts/cashflowstmt/flowstmt.module#flowstmtModule'
    }, {
      path: 'ProfitLossStatement',
      loadChildren: './accounts/plstatement/plstmt.module#plstmtModule'
    }, {
      path: 'TrialBalance',
      loadChildren: './accounts/trialbalance/trialbalance.module#trialbalanceModule'
    }, 
    {
      path: 'PurchaseReturn',
      loadChildren: './purchasemod/purchaseReturn/purchaseReturn.module#purchaseReturnModule'
    },

    {
      path: 'usertask',
      loadChildren: './usertask/usertask.module#UsertaskModule'
    },
    {
      path: 'OpenRegister',
      loadChildren: './xregister/xregister.module#XRegisterModule'
    }, {
      path: 'CloseRegister',
      loadChildren: './xregister/xregister.module#XRegisterModule'
    },

  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'userlogin',
    loadChildren: './userlogin/userlogin.module#UserloginModule'
  },

  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'domaincheck',
    loadChildren: './domaincheck/domaincheck.module#DomainCheckModule'
  },
  {
    path: 'pricing',
    loadChildren: './pricing/pricing.module#pricingModule'
  },
  {
    path: 'usersignup',
    loadChildren: './customersignup/customersignup.module#customersignupModule'
  },
  {
    path: 'employeesignup',
    loadChildren: './employeesignup/employeesignup.module#employeesignupModule'
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**',
  redirectTo: 'error/404'
}];