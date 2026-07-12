import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { UserIcon } from "@heroicons/react/24/outline";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          <UserIcon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-lg font-bold tracking-tight text-gray-900">
          Profile Information
        </h1>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <Input
          label="Full Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="e.g. Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Professional Summary"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Describe your professional background and goals..."
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-6 sm:col-span-4"
          name="email"
          placeholder="vaibhavkumar955584@gmail.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-6 sm:col-span-2"
          name="phone"
          placeholder="(123) 456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website / LinkedIn"
          labelClassName="col-span-6 sm:col-span-4"
          name="url"
          placeholder="linkedin.com/in/username"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-6 sm:col-span-2"
          name="location"
          placeholder="City, State"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
