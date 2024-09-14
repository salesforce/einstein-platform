import React, { useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (html) {
    return (
      <span
        className="footer__item"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
  }

  const isCookieSettingsLink = label === "Cookie Settings";

  const handleCookieSettings = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isClient && window.CookieConsentWrapper) {
      window.CookieConsentWrapper.unwrap().showSettings(0);
    }
  };

  return (
    <span className="footer__item">
      <Link
        className="footer__link-item"
        to={to}
        href={href}
        onClick={isCookieSettingsLink ? handleCookieSettings : undefined}
      >
        {label}
      </Link>
    </span>
  );
}
