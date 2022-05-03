"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
	var c = arguments.length,
		r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
		d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
		r = Reflect.decorate(decorators, target, key, desc);
	else
		for (var i = decorators.length - 1; i >= 0; i--)
			if (d = decorators[i])
				r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", {
	value : true
});
var core_1 = require("@angular/core");
var MENUITEMS = [

	{
		label: 'Navigation',
		main: [
		  {
			state: 'dashboard',
			name: 'Dashboard',
			type: 'link',
			icon: 'ti-home'
		  },
		]
	  },
	  {
		label: 'Doctor',
		main: [
			{
				state: 'doctor',
				name: 'Doctor',
				type: 'sub',
				icon: 'ti-layers',
		  	children: [
	
			  {
				state: 'doctorregistration',
				name: 'Doctor Registration',
			
			   
			  }, {
				state: 'doctorlist',
				name: 'Doctor List',
						   
			  }
			]
		}]
	  },
	
	  {
		label: 'Domain',
		main: [
		  {
			state: 'Admin Settings',
			name: 'Domain',
			type: 'sub',
			icon: 'ti-layers',
			children: [
			  {
				state: 'Add Domain',
				name: 'Add Domain'
			  },
			  {
				state: 'View Domain',
				name: 'View Domain'
			  }
			]
		  }]
	  },
	
	  {
		label: 'subDomain',
		main: [
		  {
			state: 'subdomain',
			name: 'SubDomain',
			type: 'sub',
			icon: 'ti-layers',
			children: [
			  {
				state: 'addsubdomain',
				name: 'Add SubDomain'
			  },
			  {
				state: 'subdomainlist',
				name: 'View SubDomain'
			  }
	
			]
		  }]
	  },
	
	
	
	
	
	  {
		label: 'Edition',
		main: [
		  {
			state: 'edition',
			name: 'Edition',
			type: 'sub',
			icon: 'ti-layers',
			children: [
			  {
				state: 'addedition',
				name: 'Add Edition'
			  },
			  {
				state: 'viewedition',
				name: 'View Edition'
			  }
	
			]
		  }]
		},
		{
			label: 'Role',
			main: [
					{
							state: 'role',
							name: 'Role',
							type: 'sub',
							icon: 'ti-layers',
							children: [
									{
											state: 'addrole',
											name: 'Add Role'
									},
								{
											state: 'viewrole',
											name: 'View Role'
									}
									
								]
						 }]
		 },
		 {
			label: 'DamageStock',
			main: [
					{
							state: 'damagestock',
							name: 'Damagestock',
							type: 'sub',
							icon: 'ti-layers',
							children: [
									{
											state: 'adddamagestock',
											name: 'Add Damagestock'
									}
									
								]
						 }]
	 },
	 {
			label: 'login',
			main: [
					{
							state: 'userlogin',
							name: 'User',
							type: 'sub',
							icon: 'ti-layers',
							children: [
									{
											state: 'login',
											name: 'Login'
									},
									{
											state: 'userdetail',
											name: 'Userdetails'
									}
	
								 
								]
						 }]
	 },
	 {
			label: 'Users',
			main: [
					{
							state: 'users',
							name: 'User',
							type: 'sub',
							icon: 'ti-layers',
							children: [
									{
											state: 'adduser',
											name: 'Add User'
									},
	
									{
											state: 'addusermodules',
											name: 'Add Module/Submodules'
									},
	
									{
											state: 'adduseraccess',
											name: 'Add Useraccess'
									}
									
							
								]
						 }]
	 },
	 {
			label: 'Product',
			main: [
					{
							state: 'product',
							name: 'Product',
							type: 'sub',
							icon: 'ti-layers',
							children: [
									{
											state: 'addproduct',
											name: 'Add Product'
									},
									{
											state: 'productlist',
											name: 'Productlist'
									},
								
							] 
							
					}]
	 },
	 
	  {
		label: 'Settings',
		main: [
		  {
			state: 'shopinfo',
			name: 'Shop Info',
			type: 'sub',
			icon: 'ti-layers',
			children: [
			  {
				state: 'addshop',
				name: 'Add Shop'
			  }, {
				state: 'viewshop',
				name: 'View Shop'
			  }
			]
		  },
		  {
			state: 'companyInfo',
			name: 'Company Info',
			type: 'sub',
			icon: 'ti-layers',
			children: [
			  {
				state: 'addcompany',
				name: 'Add Company'
			  }, {
				state: 'viewcompany',
				name: 'View Company'
			  }
			]
		  }
		]
	  },
		{
			label: 'Patient  Details',
			main: [
				{
					state: 'patient',
					name: ' PatientDetails',
					type: 'sub',
					icon: 'ti-layers',
					children: [
						{
							state: 'patientsave',
							name: 'Patientsave ',
						
						}, {
							state: 'patientinout',
							name: 'Patientinout '
							  
						}, {
							state: 'patientview',
							name: 'Patientview '
						   
						}
					]
				}
			]
		},
		{
			label: 'Distributor  Details',
			main: [
				{
					state: 'distributor',
					name: 'Dist Components',
					type: 'sub',
					icon: 'ti-layers',
					children: [
						{
							state: 'distributorSave',
							name: 'DistributorSave',
						
						}, {
							state: 'distributorEdit',
							name: 'DistributorEdit '
							  
						}, {
							state: 'distributorView',
							name: ' DistributorView'
						   
						}
					]
				}
			]
		},
		{
			label: 'Pharmacompany',
			main: [
				{
					state: 'pharmacompany',
					name: 'PharmaComponents',
					type: 'sub',
					icon: 'ti-layers',
					children: [
						{
							state: 'phcompanysave',
							name: 'Phcompanysave',
						
						}, {
							state: 'phcompanyedit',
							name: 'Phcompanyedit '
							  
						}, {
							state: 'phcompanyview',
							name: ' Phcompanyview'
						   
						}
					]
				}
			]
		},{
			label: 'creditnote',
			main: [
				{
					state: 'creditnote',
					name: 'creditnote',
					type: 'sub',
					icon: 'ti-layers',
					children: [
						{
							state: 'saveCredit',
							name: 'saveCredit',
						
						}, {
							state: 'editCreditNote',
							name: 'editCreditNote '
							  
						}, {
							state: 'viewCreditNote',
							name: ' viewCreditNote'
						   
						}
					]
				}
			]
		},
		{
			label: 'debitnote',
			main: [
				{
					state: 'debitnote',
					name: 'debitnote',
					type: 'sub',
					icon: 'ti-layers',
					children: [
						{
							state: 'saveDebitNote',
							name: 'saveDebitNote',
						
						}, {
							state: 'editDebitNote',
							name: 'editDebitNote '
							  
						}, {
							state: 'viewDebitNote',
							name: ' viewDebitNote'
						   
						}
					]
				}
			]
		},
	// Hospital Form
		{
		   label: 'Hospital form',
			  main: [
				  {
					  state: 'hospitalform',
					  name: 'hospital Components',
					  type: 'sub',
					  icon: 'ti-layers',
					  children: [
						  {
							  state: 'create-hospital',
							  name: 'Add hospital'
						  }, {
							  state: 'hospitals',
							  name: 'hospital view'
						  },
	//                    {
	//                          state: 'hospital-details',
	//                          name: 'hospital view/delete'
	//                      },
						  ]
		 }
		 ]},
	// Usersetting Modules
		 {
		   label: 'User Setting',
			  main: [
				  {
					  state: 'usersetting',
					  name: 'User Setting',
					  type: 'sub',
					  icon: 'ti-layers',
					  children: [
						  {
							  state: 'addmodules',
							  name: 'Modules'
						  }, {
								state: 'moduleview',
								name: 'View Module'
							},
	//                    {
	//                          state: 'submodules',
	//                          name: 'Sub Modules'
	//                    },
					]
		 }
		 ]},
	
		   {
			   label: 'Sub Module',
				  main: [
					  {
						  state: 'submodules',
						  name: 'Add Submodules',
						  type: 'sub',
						  icon: 'ti-layers',
						  children: [
							  {
								  state: 'addsubmodules',
								  name: 'Add Sub Modules'
							  },
							 {
								state: 'viewsubmodule',
								name: 'View Sub Modules'
							  },
							  ]
					  }]
		   },
	 
		   {
			   label: 'Warehouse',
				  main: [
					  {
						  state: 'warehouse',
						  name: 'Add Warehouse',
						  type: 'sub',
						  icon: 'ti-layers',
						  children: [
							  {
								  state: 'create-warehouse',
								  name: 'Add Warehouse'
							  },
							{
								  state: 'viewwarehouse',
								  name: 'View Warehouse'
							  },
						  ]
					  }
					  ]
		   },
		 
	{
			   label: 'Stocks',
				  main: [
					  {
						  state: 'warehousestocks',
						  name: 'Add Stocks',
						  type: 'sub',
						  icon: 'ti-layers',
						  children: [
							  {
								  state: 'create-stocks',
								  name: 'Add Stocks'
							  },
							  {
									   state: 'viewstocks',
										 name: 'View Stocks'
	
									 },
						  ]
					  }
					  ]
		   },
		   
		   {
			label: 'Warehouse Transfer',
			   main: [
				   {
					   state: 'warehouseTransfer',
					   name: 'Add Transfer',
					   type: 'sub',
					   icon: 'ti-layers',
					   children: [
						   {
							   state: 'create-WarehTransfer',
							   name: 'Add Warehouse Transfer'
						   },
						   {
									state: 'viewwarehTransfer',
									  name: 'View Warehouse Transfer'
	
								  },
					   ]
				   }
				   ]
		},
		{
				label: 'Stocks In',
				   main: [
					   {
						   state: 'warehousestocksIn',
						   name: 'Add Stocks In',
						   type: 'sub',
						   icon: 'ti-layers',
						   children: [
							   {
								   state: 'create-stocksin',
								   name: 'Add Stocks'
							   },
							   {
								   state: 'viewstocksin',
								   name: 'View Stocks'
	
							   },
							   ]
					   }
					   ]
			},
			{
				label: 'Employee',
				main: [
						{
								state: 'employeeinfo',
								name: 'employeeInfo',                                                              
								type: 'sub',
								icon: 'ti-layers',       
								children: [
										{
												state: 'addEmployee',
												name: 'Add Employee'
										}, {
												state: 'viewEmployee',
												name: 'View Employee'
										}, {
												state: 'demo1',
												name: 'GridTable'
										}    
										 
								]
					}  ]
		},{
		label: 'Branch',
		main: [
				{
						state: 'branchinfo',
						name: 'branchInformation',                                                              
						type: 'sub',
						icon: 'ti-layers',       
						children: [
								{
										state: 'addBranch',
										name: 'Add Branch'
								}, {
										state: 'viewBranch',
										name: 'View Branch'
								}
																	 
						]
			}  ]
},{
		label: 'Purchase', 
		main: [
				{
						state:'Purchase',
						name: 'purchaseOrder',                                                              
						type: 'sub',
						icon: 'ti-layers',       
						children: [
								{
										state: 'purchaseorder',
										name: 'GeneratePurhcaseOrder'
								},{
										state: 'purchaseorderview',
										name: 'ViewPurhcaseOrder'
								}               
						]
			}  ]
}

	  
	  


	 
];
var MenuItems = (function() {
	function MenuItems() {
	}
	MenuItems.prototype.getAll = function() {
		return MENUITEMS;
	};
	return MenuItems;
}());
MenuItems = __decorate([
	core_1.Injectable()
], MenuItems);
exports.MenuItems = MenuItems;