import { useForm } from "react-hook-form";

function FilterModal({
  showFilters,
  setShowFilters,
  onApply,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      salary: "",
      experience: "",
      jobType: "",
      remoteOnly: false,
    },
  });

  const onSubmit = (data) => {
    onApply(data);
    setShowFilters(false);
  };

  if (!showFilters) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Filters
          </h2>

          <button
            onClick={() => setShowFilters(false)}
            className="text-4xl text-slate-400 hover:text-white transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Salary */}
          <div className="mb-4">
            <label className="mb-2 block font-medium text-slate-300">
              Salary Range
            </label>

            <select
              {...register("salary")}
              className="w-full rounded-xl border border-slate-600 bg-[#1E293B] p-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">Any Salary</option>
              <option value="0-3">₹0 - ₹3 LPA</option>
              <option value="3-6">₹3 - ₹6 LPA</option>
              <option value="6-10">₹6 - ₹10 LPA</option>
              <option value="10+">₹10+ LPA</option>
            </select>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label className="mb-2 block font-medium text-slate-300">
              Experience
            </label>

            <select
              {...register("experience")}
              className="w-full rounded-xl border border-slate-600 bg-[#1E293B] p-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">Any Experience</option>
              <option value="0">Fresher</option>
              <option value="1-3">1 - 3 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>

          {/* Job Type */}
          <div className="mb-4">
            <label className="mb-2 block font-medium text-slate-300">
              Job Type
            </label>

            <select
              {...register("jobType")}
              className="w-full rounded-xl border border-slate-600 bg-[#1E293B] p-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Remote Only */}
          <div className="mb-6 flex items-center gap-3">
            <input
              type="checkbox"
              id="remoteOnly"
              {...register("remoteOnly")}
              className="h-5 w-5 accent-blue-600"
            />

            <label
              htmlFor="remoteOnly"
              className="text-slate-300"
            >
              Remote Only
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 rounded-xl border border-slate-600 py-3 text-slate-300 hover:bg-slate-800 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterModal;