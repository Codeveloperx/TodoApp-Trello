import { InformationCircleIcon } from "@heroicons/react/24/outline";

type PropsType = {
  title: string;
  errors: string[];
};

export const Alert = (props: PropsType) => {
  return (
    <div
      className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <InformationCircleIcon className="h-5 w-5" />
      <span className="sr-only">Danger</span>
      <div>
        <span className="font-medium">{props.title}</span>
        <ul className="mt-1.5 list-disc list-inside">
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
