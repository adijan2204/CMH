/* ==========================================================================
   CAREER MASTERY HUB - FORMS & CONFIGURATION HANDLER
   ========================================================================== */

window.CMHFormsConfig = {
  version: "4.0",
  endpointBase: "https://www.careermasteryhub.co.in/api",
  whatsappNumber: "919112222504",
  defaultWaMessage: "Hello CMH, I submitted an inquiry on the website and would like guidance.",

  formatWhatsAppUrl: function(data) {
    var text = "Hello Career Mastery Hub,\n\n" +
      "I would like to request guidance:\n" +
      "• Name: " + (data.full_name || "") + "\n" +
      "• Phone: " + (data.phone || "") + "\n" +
      "• Email: " + (data.email || "") + "\n" +
      "• Client Type: " + (data.client_type || "") + "\n" +
      "• Service Required: " + (data.service || "") + "\n" +
      "• Timeline: " + (data.timeline || "") + "\n" +
      "• Preferred Contact: " + (data.preferred_contact || "") + "\n" +
      "• Details / Decision: " + (data.message || "");
    
    return "https://wa.me/" + this.whatsappNumber + "?text=" + encodeURIComponent(text);
  }
};
