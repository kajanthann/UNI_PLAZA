import React, { useState } from "react";

const Sam = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [prob, setProb] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setProb(null);
    setImgUrl(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose an image.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch("/api/predict/", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error: ${res.status} ${txt}`);
      }

      const data = await res.json();
      setResult(data.result);
      setProb(data.probability);
      setImgUrl(data.image_path);
    } catch (err) {
      console.error(err);
      alert("Prediction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-indigo-100 flex items-center justify-center p-6">
      <div className="backdrop-blur-xl bg-white/40 w-full max-w-4xl rounded-3xl shadow-2xl p-10 border border-white/30">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-4">
          🐶 Cat / Dog Classifier 🐱
        </h1>

        <p className="text-center text-gray-600 text-lg mb-10">
          Upload an image — the model will classify whether it's a CAT or DOG.
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <label className="relative block cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-white hover:border-gray-400 hover:bg-gray-50 transition shadow">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="pointer-events-none">
              {!preview ? (
                <>
                  <p className="text-gray-700 text-xl font-medium">Click to upload an image</p>
                  <p className="text-sm text-gray-400 mt-1">PNG • JPG • JPEG</p>
                </>
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="mx-auto max-h-96 object-contain rounded-xl shadow-lg"
                />
              )}
            </div>
          </label>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2 shadow"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Predict"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(null);
                setResult(null);
                setProb(null);
                setImgUrl(null);
              }}
              className="px-7 py-3 border rounded-xl text-gray-700 hover:bg-gray-50 text-lg shadow"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Result Area */}
        {result && (
          <div className="mt-10 bg-white/70 backdrop-blur-lg p-6 rounded-2xl border shadow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-900">{result}</h2>
                <p className="text-gray-700 mt-1 text-lg">
                  Confidence: {(prob * 100).toFixed(2)}%
                </p>
              </div>

              <img
                src={imgUrl || preview}
                alt="result-img"
                className="h-40 w-40 object-cover rounded-xl shadow-xl border"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Sam;
