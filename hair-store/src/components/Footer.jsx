import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, MapPin, Scissors } from "lucide-react";
import {
  STORE_NAME,
  STORE_PHONE,
  STORE_EMAIL,
  STORE_ADDRESS,
  whatsappLink,
  callLink,
} from "../utils/constants";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--espresso)",
        color: "var(--cream)",
        padding: "60px 0 24px",
        marginTop: "auto",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(250,247,242,0.1)",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Scissors size={14} color="var(--espresso)" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                }}
              >
                {STORE_NAME}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(250,247,242,0.6)",
                lineHeight: 1.7,
              }}
            >
              Premium quality hair products — from luxurious wigs to beautiful
              bundles. Look and feel your best.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                marginBottom: 16,
                color: "var(--gold-light)",
              }}
            >
              Quick Links
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["/", "Home"],
                ["/products", "Products"],
                ["/contact", "Contact Us"],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(250,247,242,0.7)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--gold-light)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(250,247,242,0.7)")
                  }
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                marginBottom: 16,
                color: "var(--gold-light)",
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={callLink()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "0.875rem",
                  color: "rgba(250,247,242,0.7)",
                  textDecoration: "none",
                }}
              >
                <Phone size={15} color="var(--gold)" /> {STORE_PHONE}
              </a>
              <a
                href={whatsappLink(
                  "Hello! I would like to enquire about your hair products.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "0.875rem",
                  color: "rgba(250,247,242,0.7)",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={15} color="var(--gold)" /> WhatsApp Us
              </a>
              <a
                href={`mailto:${STORE_EMAIL}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "0.875rem",
                  color: "rgba(250,247,242,0.7)",
                  textDecoration: "none",
                }}
              >
                <Mail size={15} color="var(--gold)" /> {STORE_EMAIL}
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: "0.875rem",
                  color: "rgba(250,247,242,0.7)",
                }}
              >
                <MapPin
                  size={15}
                  color="var(--gold)"
                  style={{ marginTop: 2 }}
                />{" "}
                {STORE_ADDRESS}
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "rgba(250,247,242,0.4)",
            paddingTop: 24,
          }}
        >
          © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
