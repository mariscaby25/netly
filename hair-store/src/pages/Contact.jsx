import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  STORE_PHONE,
  STORE_EMAIL,
  STORE_ADDRESS,
  whatsappLink,
  callLink,
} from "../utils/constants";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    value: STORE_PHONE,
    href: callLink(),
    cta: "Call Us",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: whatsappLink(
      "Hello! I would like to enquire about your hair products.",
    ),
    cta: "Message Us",
    target: "_blank",
  },
  {
    icon: Mail,
    label: "Email",
    value: STORE_EMAIL,
    href: `mailto:${STORE_EMAIL}`,
    cta: "Send Email",
  },
  {
    icon: MapPin,
    label: "Location",
    value: STORE_ADDRESS,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat: 8am – 8pm\nSunday: 10am – 6pm",
  },
];

export default function Contact() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "60px 0 80px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <p className="section-subtitle" style={{ marginBottom: 10 }}>
              Get in touch
            </p>
            <h1 className="section-title">Contact Us</h1>
            <p
              style={{
                color: "var(--brown-mid)",
                marginTop: 16,
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              We'd love to hear from you. Reach out to place an order, ask
              questions, or just say hello.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {CONTACT_ITEMS.map(
              ({ icon: Icon, label, value, href, cta, target }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--white)",
                    border: "1.5px solid var(--cream-dark)",
                    borderRadius: "var(--radius-md)",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: "var(--espresso)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} color="var(--gold)" />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--brown-light)",
                        marginBottom: 4,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        color: "var(--espresso)",
                        fontSize: "0.9375rem",
                        whiteSpace: "pre-line",
                        lineHeight: 1.6,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                  {href && cta && (
                    <a
                      href={href}
                      target={target}
                      rel={
                        target === "_blank" ? "noopener noreferrer" : undefined
                      }
                      className="btn-outline"
                      style={{
                        alignSelf: "flex-start",
                        fontSize: "0.8rem",
                        padding: "9px 18px",
                        marginTop: "auto",
                      }}
                    >
                      {cta}
                    </a>
                  )}
                </div>
              ),
            )}
          </div>

          {/* WhatsApp big CTA */}
          <div
            style={{
              marginTop: 48,
              background: "var(--espresso)",
              borderRadius: "var(--radius-lg)",
              padding: "48px 40px",
              textAlign: "center",
            }}
          >
            <MessageCircle
              size={36}
              color="var(--gold)"
              style={{ margin: "0 auto 16px" }}
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                color: "var(--cream)",
                fontWeight: 300,
                marginBottom: 12,
              }}
            >
              Fastest way to order
            </h2>
            <p
              style={{
                color: "rgba(250,247,242,0.65)",
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              Send us a WhatsApp message and we'll help you pick the perfect
              product and arrange delivery.
            </p>
            <a
              href={whatsappLink("Hello! I'd like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#25D366",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <MessageCircle size={18} /> Open WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
