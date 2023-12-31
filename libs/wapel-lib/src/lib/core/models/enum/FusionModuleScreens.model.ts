/** main module names */
export enum FusionParentModule {
  /** 1- setting module -- الإعدادات  */
  SETTING_MODULE = 'SETTING_MODULE',
  /** 2- finance module -- الإدارة المالية */
  FINANCIAL_MANAGE_MODULE = 'FINANCIAL_MANAGE_MODULE',
  /** 3- funding module -- السياسة التمويلية */
  FUNDING_MODULE = 'FUNDING_MODULE',
  /** 4- submit order module -- تقديم الطلبات */
  SUBMITTING_ORDER_MODULE = 'SUBMITTING_ORDER_MODULE',
  /** 5- reporting prog - التقارير */
  REPORTING_MODULE = 'REPORTING_MODULE',
  /** 6- finance prog - برامج التمويل */
  FINANCIN_PROGRAMS_MODULE = 'FINANCIN_PROGRAMS_MODULE',
  /** 7- reporting prog - الرقابة و المراجعة */
  OVERSIGHT_PORTIFOLIO_MODULE = 'OVERSIGHT_PORTIFOLIO_MODULE',
  /** 8- end of day  */
  EOD_MODULE = 'EOD_MODULE',
  /** 9- القائمة السوداء  */
  BLACK_LIST_MODULE = 'BLACK_LIST_MODULE',
  /** 10- إحالة الحق */
  OFFLOADING_MODULE = 'OFFLOADING_MODULE',
}

/** sub module names */
export enum FusionSubmodule {
  ADMIN_SETTINGS_SUBMODULE = 'ADMIN_SETTINGS_SUBMODULE',
  SYSTEM_CONFIG_SUBMODULE = 'SYSTEM_CONFIG_SUBMODULE',
  TRADE_SUBMODULE = 'TRADE_SUBMODULE',
  SETTING_FINANCIAL_SUBMODULE = 'SETTING_FINANCIAL_SUBMODULE',
  /** التحويل بين الفروع */
  SETTING_FINANCIAL_BRANCH_BETWEEN_TRANS_SUBMODULE = 'SETTING_FINANCIAL_BRANCH_BETWEEN_TRANS_SUBMODULE',
  /** التحويل داخل الفروع */
  SETTING_FINANCIAL_BRANCH_INTRANS_SUBMODULE = 'SETTING_FINANCIAL_BRANCH_INTRANS_SUBMODULE',
  /** إعدادات المنتجات */
  FUNDING_PRODUCT_SETTING_SUBMODULE = 'FUNDING_PRODUCT_SETTING_SUBMODULE',
  /** المخاطر */
  FUNDING_RISK_SETTING_SUBMODULE = 'FUNDING_RISK_SETTING_SUBMODULE',
  /** المخصصات */
  FUNDING_ALLOCATIONS_SUBMODULE = 'FUNDING_ALLOCATIONS_SUBMODULE',
  /** الحوافز */
  FUNDING_INCENTIVES_SETTING_SUBMODULE = 'FUNDING_INCENTIVES_SETTING_SUBMODULE',
  /** العروض */
  FUNDING_OFFERS_SETTING_SUBMODULE = 'FUNDING_OFFERS_SETTING_SUBMODULE',
  /** الإستعلام الإئتماني */
  SUBMITING_ORDERS_ENQUIRY_SUBMODULE = 'SUBMITING_ORDERS_ENQUIRY_SUBMODULE',
  /**الطلبات التمويلية */
  SUBMITING_ORDERS_FUNDING_REQUESTS_SUBMODULE = 'SUBMITING_ORDERS_FUNDING_REQUESTS_SUBMODULE',
  /** 5- reporting prog - التقارير */
  REPORTING_ALL_REPORTS_SUBMODULE = 'REPORTING_ALL_REPORTS_SUBMODULE',
  /** معاملات اليومية */
  FUNDING_PROG_DAILY_TRANSACTIONS_SUBMODULE = 'FUNDING_PROG_DAILY_TRANSACTIONS_SUBMODULE',
  /** محفظة المسؤول */
  LOAN_OFFICER_PORTIFOLIO_SUBMODULE = 'LOAN_OFFICER_PORTIFOLIO_SUBMODULE',
}

/** all application pages */
export enum FusionAppScreens {
  ADMIN_SETTING_USERS_ITEM = 'ADMIN_SETTING_USERS_ITEM',
  ADMIN_SETTING_BRANCHES_ITEM = 'ADMIN_SETTING_BRANCHES_ITEM',
  ADMIN_SETTING_UPDATE_USER_ITEM = 'ADMIN_SETTING_UPDATE_USER_ITEM',
  ADMIN_SETTING_USER_PROFILE_ITEM = 'ADMIN_SETTING_USER_PROFILE_ITEM',
  ADMIN_SETTING_UPDATE_PASSWORD_ITEM = 'ADMIN_SETTING_UPDATE_PASSWORD_ITEM',
  SYSTEM_CONFIG_REGION_ITEM = 'SYSTEM_CONFIG_REGION_ITEM',
  SYSTEM_CONFIG_COUNTRY_ITEM = 'SYSTEM_CONFIG_COUNTRY_ITEM',
  SYSTEM_CONFIG_STATE_ITEM = 'SYSTEM_CONFIG_STATE_ITEM',
  SYSTEM_CONFIG_CITY_ITEM = 'SYSTEM_CONFIG_CITY_ITEM',
  SYSTEM_CONFIG_VILLAGE_ITEM = 'SYSTEM_CONFIG_VILLAGE_ITEM',
  SYSTEM_CONFIG_ECONOMIC_SECTOR_ITEM = 'SYSTEM_CONFIG_ECONOMIC_SECTOR_ITEM',
  SYSTEM_CONFIG_SETTING_MAIN_SCREEN_ITEM = 'SYSTEM_CONFIG_SETTING_MAIN_SCREEN_ITEM',
  SYSTEM_CONFIG_PRODUCTS_ITEM = 'SYSTEM_CONFIG_PRODUCTS_ITEM',
  SYSTEM_CONFIG_USERS_ITEM = 'SYSTEM_CONFIG_USERS_ITEM',
  SYSTEM_CONFIG_BASIC_DATA_ITEM = 'SYSTEM_CONFIG_BASIC_DATA_ITEM',
  SYSTEM_CONFIG_ROLES_ITEM = 'SYSTEM_CONFIG_ROLES_ITEM',
  SETTING_FINANCIAL_TREE_ITEM = 'SETTING_FINANCIAL_TREE_ITEM',
  SETTING_FINANCE_TRANS_BETWEEN_CURR_CREATE_ITEM = 'SETTING_FINANCE_TRANS_BETWEEN_CURR_CREATE_ITEM', // إنشاء تحويل نقدي
  SETTING_FINANCE_TRANS_BETWEEN_CURR_CANCEL_ITEM = 'SETTING_FINANCE_TRANS_BETWEEN_CURR_CANCEL_ITEM', // إلغاء تحويل نقدي
  SETTING_FINANCE_TRANS_BETWEEN_CURR_REVICE_ITEM = 'SETTING_FINANCE_TRANS_BETWEEN_CURR_REVICE_ITEM', // إستلام تحويل نقدي
  SETTING_FINANCE_BRANCH_INTRANS_OPEN_SAFE_ITEM = 'SETTING_FINANCE_BRANCH_INTRANS_OPEN_SAFE_ITEM', // إفتتاح الخزن الفرعية
  SETTING_FINANCE_BRANCH_INTRANS_CLOSE_SAFE_ITEM = 'SETTING_FINANCE_BRANCH_INTRANS_CLOSE_SAFE_ITEM', // إغلاق خزن الصرافين
  SETTING_FINANCE_BRANCH_INTRANS_RECIVE_ITEM = 'SETTING_FINANCE_BRANCH_INTRANS_RECIVE_ITEM', // إستلام  داخل الفرع
  SETTING_INTERESTS_ITEM = 'SETTING_INTERESTS_ITEM',
  SYSTEM_FINANCIAL_CONFIG_BANKS_ITEM = 'SYSTEM_FINANCIAL_CONFIG_BANKS_ITEM',
  SYSTEM_FINANCIAL_CONFIG_CURRENCY_ITEM = 'SYSTEM_FINANCIAL_CONFIG_CURRENCY_ITEM',
  SYSTEM_FINANCIAL_CONFIG_GLCASH_ITEM = 'SYSTEM_FINANCIAL_CONFIG_GLCASH_ITEM',
  SETTING_EXPENSES_ITEM = 'SETTING_EXPENSES_ITEM',
  SETTING_INSURANCE_COMPANIES_ITEM = 'SETTING_INSURANCE_COMPANIES_ITEM',
  SETTING_FUNDING_SOURCES_ITEM = 'SETTING_FUNDING_SOURCES_ITEM',
  SETTING_DOCUMENTS_ITEM = 'SETTING_DOCUMENTS_ITEM',
  SETTING_GL_ENTRIES_ITEM = 'SETTING_GL_ENTRIES_ITEM',
  SETTING_ORGANIZATION_ITEM = 'SETTING_ORGANIZATION_ITEM',
  SETTING_CLIENTINQUIRY_ITEM = 'SETTING_CLIENTINQUIRY_ITEM',
  SETTING_CLIENTACCEPTMESURMENT_ITEM = 'SETTING_CLIENTACCEPTMESURMENT_ITEM',
  FUNDING_FUNDING_PROGRAMS_ITEM = 'FUNDING_FUNDING_PROGRAMS_ITEM',
  FUNDING_EARLY_PAYMENT_ITEM = 'FUNDING_EARLY_PAYMENT_ITEM',
  FUNDING_CANCEL_PAYMENT_ITEM = 'FUNDING_CANCEL_PAYMENT_ITEM',
  FUNDING_PREMIUM_COLLECTION_ITEM = 'FUNDING_PREMIUM_COLLECTION_ITEM',
  FUNDING_PAY_ORDER_COMMISSIONS_ITEM = 'FUNDING_PAY_ORDER_COMMISSIONS_ITEM',
  FUNDING_CANCEL_FUNDING_DISBURSEMENT_ITEM = 'FUNDING_CANCEL_FUNDING_DISBURSEMENT_ITEM',
  /** الإستعلام عن تمويل */
  FUNDING_QUERY_SERVICE_ITEM = 'FUNDING_QUERY_SERVICE_ITEM',
  /** products page */
  FUNDING_PRODUCT_PRODUCTS_ITEM = 'FUNDING_PRODUCT_PRODUCTS_ITEM',
  FUNDING_PRODUCT_FUNDING_REQUEST_ITEM = 'FUNDING_PRODUCT_FUNDING_REQUEST_ITEM',
  FUNDING_REQUESTS_CLIENTS_ITEM = 'FUNDING_REQUESTS_CLIENTS_ITEM',
  FUNDING_REQUESTS_COMPANY_ITEM = 'FUNDING_REQUESTS_COMPANY_ITEM',
  FUNDING_REQUESTS_ENTERPRISE_ITEM = 'FUNDING_REQUESTS_ENTERPRISE_ITEM',
  FUNDING_REQUESTS_FUNDING_DISBURSEMENT_ITEM = 'FUNDING_REQUESTS_FUNDING_DISBURSEMENT_ITEM',
  FUNDING_REQUESTS_COMPANY_REQUEST_ITEM = 'FUNDING_REQUESTS_COMPANY_REQUEST_ITEM',
  FUNDING_REQUESTS_GROUPS_REQUEST_ITEM = 'FUNDING_REQUESTS_GROUPS_REQUEST_ITEM',
  FUNDING_REQUESTS_INDIVIDUAL_REQUEST_ITEM = 'FUNDING_REQUESTS_COMPANY_REQUEST_ITEM',
  FUNDING_REQUESTS_ORDERS_FOLLOW_ITEM = 'FUNDING_REQUESTS_ORDERS_FOLLOW_ITEM',
  FUNDING_REQUESTS_CALC_INSTLLMENT_ITEM = 'FUNDING_REQUESTS_CALC_INSTLLMENT_ITEM',
  /** إحتساب جدول الأقساط */
  FUNDING_PREMIUM_CALCULATION_ITEM = 'FUNDING_PREMIUM_CALCULATION_ITEM',
  WORKFLOW_SETUP_ITEM = 'WORKFLOW_SETUP_ITEM',
  FUNDING_PRODUCT_SETTING_CREDIT_SCORES_ITEM = 'FUNDING_PRODUCT_SETTING_CREDIT_SCORES_ITEM',
  FUNDING_REQUESTS_CUSTOMER_ITEM = 'FUNDING_REQUESTS_CUSTOMER_ITEM',
  /** تتبع الطلبات */
  FUNDING_REQUESTS_TRACKING_ITEM = 'FUNDING_REQUESTS_TRACKING_ITEM',
  REPORTING_REPORTS_ITEM = 'REPORTING_REPORTS_ITEM',
  BLACK_LIST_ADD_CUSTOMER_ITEM = 'BLACK_LIST_ADD_CUSTOMER_ITEM',
  BLACK_LIST_SETUP_ITEM = 'BLACK_LIST_SETUP_ITEM',
  BLACK_LIST_REMOVE_CUSTOMER_ITEM = 'BLACK_LIST_REMOVE_CUSTOMER_ITEM',
  BLACK_LIST_QUERY_CUTOMERS_ITEM = 'BLACK_LIST_QUERY_CUTOMERS_ITEM',
  LO_SERVICE_TRANSFER_ITEM = 'LO_SERVICE_TRANSFER_ITEM',
  FUNDING_PROVISION_SETTING_ITEM = 'FUNDING_PROVISION_SETTING_ITEM',
  FUNDING_RISK_SETTING_ITEM = 'FUNDING_RISK_SETTING_ITEM',
  FUNDING_RISK_BRANCH_ITEM = 'FUNDING_RISK_BRANCH_ITEM',
  FUNDING_RISK_USERS_ITEM = 'FUNDING_RISK_USERS_ITEM',
  RIGHT_REFFERAL_CONCENT_ITEM = 'RIGHT_REFFERAL_CONCENT_ITEM',
  RIGHT_REFFERAL_PROCESSING_ITEM = 'RIGHT_REFFERAL_PROCESSING_ITEM',
  RIGHT_REFFERAL_REVIEW_ITEM = 'RIGHT_REFFERAL_REVIEW_ITEM',
  RIGHT_REFFERAL_EXECUTION_ITEM = 'RIGHT_REFFERAL_EXECUTION_ITEM',
  SETTING_ISSUE_SOURCES_ITEM = 'SETTING_ISSUE_SOURCES_ITEM',
}

export enum FusionScreenRoles {
  ADD = 'ADD',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  EXTRACT = 'EXTRACT',
  COPY = 'COPY',
  VIEW = 'VIEW',
  HELP = 'HELP',
}

export interface any {
  modulesSubmodule?: any[];
  screens?: any[];
  screenRoles?: any;
}
