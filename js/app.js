const API_URL = "https://script.google.com/macros/s/AKfycbyZR3zLApZyrnaZync9Q_Ilq4CB4AmksxJZfcK9WtxpJN0zDLcWmWua16P8QE9mA8_tlg/exec";

document.addEventListener("DOMContentLoaded", () => {

  const forms = document.querySelectorAll("form");

  forms.forEach(form => {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      const payload = {
        name: document.getElementById("name")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        email: document.getElementById("email")?.value || "",
        city: document.getElementById("city")?.value || "",
        service: document.getElementById("service")?.value || "",
        message: document.getElementById("message")?.value || "",
        source: window.location.pathname
      };

      try {

        await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(payload)
        });

        alert("Lead Submitted Successfully");

        window.location.href = "thank-you.html";

      } catch (err) {

        alert("Submission Failed");

        console.log(err);

      }

    });

  });

});
