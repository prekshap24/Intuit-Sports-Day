import MessageConstants from "./MessageConstants";

const routes = [
  {
    path: "/accounts",
    name: "Accounts",
    icon: "home",
    component: "",
    layout: "/admin",
  },
  {
    path: "",
    name: MessageConstants.ADJUSTMENTDETAILS,
    icon: "adjust",
    component: "",
    layout: "/adjustment",
  },
  {
    path: "",
    name: MessageConstants.POSTADJUSTMENT,
    icon: "book",
    component: "",
    layout: "/postAdjustment",
  },
  {
    path: "",
    name: MessageConstants.INVOICEDETAILS,
    icon: "file-invoice",
    component: "",
    layout: "/invoice",
  },
  {
    path: "",
    name: MessageConstants.DOWNLOADINVOICE,
    icon: "download",
    component: "",
    layout: "/downloadInvoice",
  },
  {
    path: "",
    name: MessageConstants.PAYMENTDETAILS,
    icon: "coins",
    component: "",
    layout: "/payment",
  },
  {
    path: "",
    name: MessageConstants.POSTNRC,
    icon: "receipt",
    component: "",
    layout: "/postNrc",
  },
  {
    path: "",
    name: MessageConstants.TAXEXEMPTION,
    icon: "chart-line",
    component: "",
    layout: "/taxExemption",
  },
];

export default routes;
