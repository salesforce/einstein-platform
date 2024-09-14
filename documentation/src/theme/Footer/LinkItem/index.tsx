import React from "react";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/Footer/LinkItem";

declare global {
  interface Window {
    CookieConsentWrapper?: {
      unwrap: () => {
        showSettings: (delay?: number) => void;
      };
    };
  }
}

export default function FooterLinkItem({ item }: Props): JSX.Element {
  const { html, label, to, href } = item;

  if (html) {
    return (
      <li
        className="footer__item"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
  }

  const isCookieSettingsLink = label === "Cookie Settings";

  return (
    <li className="footer__item">
      <Link
        className="footer__link-item"
        to={to}
        href={href}
        onClick={
          isCookieSettingsLink
            ? (event) => {
                event.preventDefault();
                window.CookieConsentWrapper?.unwrap().showSettings(0);
              }
            : undefined
        }
      >
        {label}
      </Link>
    </li>
  );
}
