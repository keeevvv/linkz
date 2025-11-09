import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface LinkzResetPasswordEmailProps {
  email?: string;
  updatedDate?: Date;
  resetPasswordLink?: string;
}

const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

export const LinkzResetPasswordEmail = ({
  email,
  updatedDate,
  resetPasswordLink,
}: LinkzResetPasswordEmailProps) => {
  const formattedDate = updatedDate
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "medium",
      }).format(updatedDate)
    : "";

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Reset your Linkz account password</Preview>
        <Container style={container}>
          <Section style={logo}>
            <Img
              width={114}
              src={`http://localhost:3000/images/logo-transparent.png`}
              alt="Linkz"
              style={logoImg}
            />
          </Section>

          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content}>
            <Text style={title}>Reset your password</Text>
            <Text style={paragraph}>Hi {email},</Text>

            <Text style={paragraph}>
              We received a request to reset the password for your Linkz account{" "}
              {formattedDate && `on ${formattedDate}`}.
            </Text>

            <Text style={paragraph}>
              To reset your password, click the button below:
            </Text>

            <Section style={{ textAlign: "center", margin: "30px 0" }}>
              <Link
                href={
                  resetPasswordLink || "https://www.linkz.tv/reset-password"
                }
                style={button}
              >
                Reset Password
              </Link>
            </Section>

            <Text style={paragraph}>
              If the button above doesn't work, copy and paste the following
              link into your browser:
            </Text>
            <Text style={{ ...paragraph, wordBreak: "break-all" }}>
              <Link
                href={
                  resetPasswordLink || "https://www.linkz.tv/reset-password"
                }
                style={link}
              >
                {resetPasswordLink || "https://www.linkz.tv/reset-password"}
              </Link>
            </Text>

            <Text style={paragraph}>
              If you didn’t request this password reset, you can safely ignore
              this email. Your account will remain secure.
            </Text>

            <Text style={paragraph}>
              Thanks, <br />
              <strong>Linkz Support Team</strong>
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Img
                src={`${baseUrl}/static/Linkz-icon-twitter.png`}
                alt="Twitter"
              />
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Img
                src={`${baseUrl}/static/Linkz-icon-facebook.png`}
                alt="Facebook"
              />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © 2022 Linkz, All Rights Reserved <br />
              350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

LinkzResetPasswordEmail.PreviewProps = {
  email: "alanturing@linkz.tv",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
  resetPasswordLink: "https://www.linkz.tv/reset-password/token123",
} as LinkzResetPasswordEmailProps;

export default LinkzResetPasswordEmail;

// === STYLES ===
const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const title = {
  lineHeight: 1.5,
  fontSize: 25,
  fontWeight: "bold",
};

const container = {
  maxWidth: "580px",
  margin: " auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
  padding: "10px 0",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  padding: 30,
};

const logoImg = {
  margin: "0 auto",
};

const sectionsBorders = {
  width: "100%",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgba(0, 162, 255, 1)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
  color: "rgba(0, 162, 255, 1)",
};

const button = {
  backgroundColor: "rgba(0, 162, 255, 1)",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
  display: "inline-block",
};
