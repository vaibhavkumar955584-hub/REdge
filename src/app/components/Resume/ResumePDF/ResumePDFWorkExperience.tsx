import { View } from "@react-pdf/renderer";
import {
  ResumePDFSection,
  ResumePDFBulletList,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeWorkExperience } from "lib/redux/types";

export const ResumePDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string;
  workExperiences: ResumeWorkExperience[];
  themeColor: string;
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        // Hide company name if it is the same as the previous company
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company;

        return (
          <View key={idx} style={idx !== 0 ? { marginTop: spacing["3"] } : {}}>
            <View style={{ ...styles.flexRowBetween, alignItems: 'flex-end', marginBottom: spacing["1"] }}>
               {!hideCompanyName && (
                 <ResumePDFText bold={true} style={{ fontSize: '12pt' }}>{company}</ResumePDFText>
               )}
               <ResumePDFText style={{ fontSize: '10pt', color: '#666' }}>{date}</ResumePDFText>
            </View>
            <View
              style={{
                ...styles.flexRowBetween,
              }}
            >
              <ResumePDFText style={{ flexGrow: 1, flexBasis: 0, fontStyle: 'italic' }}>
                {jobTitle}
              </ResumePDFText>
            </View>
            <View style={{ ...styles.flexCol, marginTop: spacing["1"] }}>
              <ResumePDFBulletList items={descriptions} />
            </View>
          </View>
        );
      })}
    </ResumePDFSection>
  );
};
