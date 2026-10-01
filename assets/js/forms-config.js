/* ==========================================================================
   CAREER MASTERY HUB - FORMS & CONFIGURATION HANDLER
   ========================================================================== */

window.CMHFormsConfig = {
  version: "4.0",
  endpointBase: "https://www.careermasteryhub.co.tz/api",
  whatsappNumber: "255778629622",
  defaultWaMessage: "Hello CMH, I submitted an inquiry on the website and would like guidance.",

  formatWhatsAppUrl: function(data) {
    var text = "Hello Career Mastery Hub,\n\n" +
      "Name: " + (data.full_name || "") + "\n" +
      "Phone: " + (data.phone || "") + "\n" +
      "Service: " + (data.service || "") + "\n" +
      "Client Type: " + (data.client_type || "") + "\n" +
      "Timeline: " + (data.timeline || "") + "\n" +
      "Preferred Contact: " + (data.preferred_contact || "") + "\n" +
      "Details: " + (data.message || "");
    
    return "https://wa.me/" + this.whatsappNumber + "?text=" + encodeURIComponent(text);
  }
};
