import { View } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, email, phone, url, summary, location } = profile;

  return (
    <View style={{ marginTop: spacing["2"], marginBottom: spacing["4"], alignItems: 'center' }}>
      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "28pt", marginBottom: spacing["2"], textTransform: 'uppercase', letterSpacing: '2pt' }}
      >
        {name}
      </ResumePDFText>

      <View
        style={{
          ...styles.flexRow,
          justifyContent: 'center',
          alignItems: "center",
          flexWrap: 'nowrap',
          gap: spacing["2"],
          marginBottom: spacing["3"],
          width: '100%',
        }}
      >
        {email && (
          <ResumePDFLink src={`mailto:${email}`} isPDF={isPDF}>
            <ResumePDFText style={{ fontSize: '10pt' }}>{email}</ResumePDFText>
          </ResumePDFLink>
        )}

        {phone && (
          <>
            {email && <ResumePDFText style={{ color: "#d1d5db", fontSize: '10pt' }}>{" | "}</ResumePDFText>}
            <ResumePDFText style={{ fontSize: '10pt' }}>{phone}</ResumePDFText>
          </>
        )}

        {location && (
          <>
            {(email || phone) && <ResumePDFText style={{ color: "#d1d5db", fontSize: '10pt' }}>{" | "}</ResumePDFText>}
            <ResumePDFText style={{ fontSize: '10pt' }}>{location}</ResumePDFText>
          </>
        )}

        {url && (
          <>
            {(email || phone || location) && <ResumePDFText style={{ color: "#d1d5db", fontSize: '10pt' }}>{" | "}</ResumePDFText>}
            <ResumePDFLink
              src={url.startsWith("http") ? url : `https://${url}`}
              isPDF={isPDF}
            >
              <ResumePDFText style={{ fontSize: '10pt' }}>{url.replace(/^https?:\/\//, "")}</ResumePDFText>
            </ResumePDFLink>
          </>
        )}
      </View>

      {summary && (
        <View style={{ width: '100%', alignItems: 'flex-start' }}>
            <ResumePDFSection heading="SUMMARY" themeColor={themeColor}>
              <ResumePDFText style={{ lineHeight: 1.5, textAlign: 'justify' }}>{summary}</ResumePDFText>
            </ResumePDFSection>
        </View>
      )}
    </View>
  );
};
