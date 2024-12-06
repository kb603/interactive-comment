import { MainComment } from "./components/MainComment";
import { SubComment } from "./components/SubComment";
import { TextBox } from "./components/TextBox";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 bg-slate-200 p-4 px-10 py-10">
      <MainComment />
      <MainComment />

      <SubComment />
      <SubComment />

      <TextBox />
    </div>
  );
}
