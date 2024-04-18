export type FormInput = {
  id: string;
  password: string;
};

export type OnSubmit = {
  onSubmit: (form: FormInput) => void;
};
