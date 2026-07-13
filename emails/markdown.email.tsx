import { SiteConfig } from "@/site-config";
import { Markdown, Preview } from "@react-email/components";
import { EmailLayout } from "./utils/email-layout";

export default function MarkdownEmail(props: {
  markdown: string;
  preview?: string;
  disabledSignature?: boolean;
}) {
  let markdown = props.markdown;

  if (!props.disabledSignature) {
    markdown += `

Cordialement,\n
${SiteConfig.team.name} de ${SiteConfig.title}
    `;
  }

  // Normalize markdown by removing leading/trailing spaces from each line
  markdown = markdown
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  return (
    <EmailLayout disableTailwind>
      <Preview>{props.preview ?? "Vous avez reçu un e-mail."}</Preview>
      <Markdown
        markdownCustomStyles={{
          p: {
            fontSize: "1.125rem",
            lineHeight: "1.5rem",
          },
          li: {
            fontSize: "1.125rem",
            lineHeight: "1.5rem",
          },
          link: {
            color: "#6366f1",
          },
        }}
      >
        {markdown}
      </Markdown>
    </EmailLayout>
  );
}
