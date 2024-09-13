import React from "react";
import Layout from "@theme/Layout";

const CookieSettingsButton = () => {
  // Function to open the cookie settings modal
  const openCookieSettings = () => {
    // Check if the global CookieConsent object exists
    if (window.initCookieConsent) {
      const cookieconsent = window.initCookieConsent();
      cookieconsent.run({
        autorun: true,
        current_lang: "en",
        autoclear_cookies: true,
        page_scripts: true,

        onFirstAction: function (user_preferences, cookie) {
          // callback triggered only once
        },

        onAccept: function (cookie) {
          // ... cookieconsent accepted
        },

        onChange: function (cookie, changed_preferences) {
          // ... cookieconsent preferences were changed
        },

        languages: {
          en: {
            consent_modal: {
              title: "I use cookies",
              description:
                'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only upon approval. <a aria-label="Cookie policy" class="cc-link" href="#">Read more</a>',
              primary_btn: {
                text: "Accept",
                role: "accept_all", // 'accept_selected' or 'accept_all'
              },
              secondary_btn: {
                text: "Settings",
                role: "settings", // 'settings' or 'accept_necessary'
              },
            },
            settings_modal: {
              title: "Cookie preferences",
              save_settings_btn: "Save settings",
              accept_all_btn: "Accept all",
              reject_all_btn: "Reject all", // optional, [v.2.5.0 +]
              cookie_table_headers: [
                { col1: "Name" },
                { col2: "Domain" },
                { col3: "Expiration" },
                { col4: "Description" },
                { col5: "Type" },
              ],
              blocks: [
                {
                  title: "Cookie usage",
                  description:
                    "I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.",
                },
                {
                  title: "Strictly necessary cookies",
                  description:
                    "These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly.",
                  toggle: {
                    value: "necessary",
                    enabled: true,
                    readonly: true,
                  },
                },
                {
                  title: "Analytics cookies",
                  description:
                    "These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.",
                  toggle: {
                    value: "analytics",
                    enabled: false,
                    readonly: false,
                  },
                  cookie_table: [
                    {
                      col1: "^_ga",
                      col2: "google.com",
                      col3: "2 years",
                      col4: "description ...",
                      col5: "Permanent cookie",
                      is_regex: true,
                    },
                    {
                      col1: "_gid",
                      col2: "google.com",
                      col3: "1 day",
                      col4: "description ...",
                      col5: "Permanent cookie",
                    },
                  ],
                },
                {
                  title: "More information",
                  description:
                    'For any queries in relation to my policy on cookies and your choices, please <a class="cc-link" href="#yourwebsite">contact me</a>.',
                },
              ],
            },
          },
        },
      });
      const prefs = cookieconsent.getUserPreferences();
      console.log(prefs);
    } else {
      console.error(
        "cookieconsent object not found. Make sure it is properly initialized."
      );
    }
  };

  return <button onClick={openCookieSettings}>Open Cookie Settings</button>;
};

export default function Cookies() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <CookieSettingsButton />
    </Layout>
  );
}
