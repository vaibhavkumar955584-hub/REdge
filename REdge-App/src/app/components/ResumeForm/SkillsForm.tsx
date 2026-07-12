import { Form } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  InputGroupWrapper,
} from "components/ResumeForm/Form/InputGroup";
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectSkills, changeSkills } from "lib/redux/resumeSlice";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
  selectThemeColor,
} from "lib/redux/settingsSlice";

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills);
  const dispatch = useAppDispatch();
  const { featuredSkills, descriptions } = skills;
  const form = "skills";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8";

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }));
  };
  const handleFeaturedSkillsChange = (
    idx: number,
    skill: string,
    rating: number
  ) => {
    dispatch(changeSkills({ field: "featuredSkills", idx, skill, rating }));
  };
  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-6">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Skills List"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="e.g. JavaScript, React, Node.js"
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[5.5rem] top-[0.1rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>

        <div className="col-span-full my-4 border-t border-gray-100" />

        <div className="col-span-full">
          <InputGroupWrapper
            label="Featured Skills (Optional)"
          >
            <p className="mt-1 text-sm font-normal text-gray-500">
              Highlight your top competencies. More circles indicate higher proficiency.
            </p>
          </InputGroupWrapper>
        </div>

        <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {featuredSkills.map(({ skill, rating }, idx) => (
            <FeaturedSkillInput
              key={idx}
              skill={skill}
              rating={rating}
              setSkillRating={(newSkill, newRating) => {
                handleFeaturedSkillsChange(idx, newSkill, newRating);
              }}
              placeholder={`Featured Skill ${idx + 1}`}
              circleColor={themeColor}
            />
          ))}
        </div>
      </div>
    </Form>
  );
};
