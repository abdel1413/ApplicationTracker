import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendar,
  FaExchangeAlt,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export const ViewApplication = () => {
  const { id } = useParams();

  // undefined = still loading
  // null = application not found
  const [application, setApplication] = useState(undefined);

  useEffect(() => {
    try {
      const data =
        JSON.parse(localStorage.getItem("applications")) || [];

      const selectedApplication = data.find(
        app => String(app.id) === String(id)
      );

      setApplication(selectedApplication || null);
    } catch (error) {
      console.error("Unable to load application:", error);
      setApplication(null);
    }
  }, [id]);

  if (application === undefined) {
    return (
      <div className="pt-24 px-4 text-center">
        <p className="text-gray-600">Loading application...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="pt-24 px-4 text-center mb-3">
        <h1 className="text-2xl font-bold text-red-500 mb-3">
          Application not found
        </h1>

        <Link
          to="/applications"
          className="text-blue-500 font-medium hover:underline"
        >
           ←  Back to Applications
        </Link>
      </div>
    );
  }

  const formattedStatus =
    application.status.charAt(0).toUpperCase() +
    application.status.slice(1);

  const companyName =
    application.company.charAt(0).toUpperCase() +
    application.company.slice(1);

  const statusStyles = {
    applied: "bg-blue-100 text-blue-700",
    interview: "bg-yellow-100 text-yellow-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="pt-20 pb-2 px-3 sm:pt-24 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold mb-3 text-xl sm:text-lg">
        Application Details
      </h1>

      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {companyName}
            </h2>

            <p className="flex gap-2 items-center text-gray-600 mt-2">
              <FaBriefcase />
              {application.role}
            </p>
          </div>

          <span
            className={`self-start px-3 py-1 rounded-full text-sm font-medium ${
              statusStyles[application.status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {formattedStatus}
          </span>
        </div>

        <div className="space-y-3 sm:space-y-5">
          <div>
            <h2 className="font-semibold text-gray-800">
              Date Applied
            </h2>

            <p className="flex items-center gap-2 mt-1 text-gray-600">
              <FaCalendar />
              {/* {dayjs(application.dateApplied).format(
                "MMMM D, YYYY"
              )} */}
              {formatDate(application.dateApplied)}
            </p>
          </div>

          {application.jobPostingUrl && (
            <div>
              <h2 className="text-gray-800 font-semibold">
                Job Posting
              </h2>

              <a
                href={application.jobPostingUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex gap-2 text-blue-600 items-center hover:underline break-words"
              >
                Open job URL
                <FaExchangeAlt className="text-sm" />
              </a>
            </div>
          )}

          <div>
            <h2 className="font-semibold text-gray-800">
              Notes
            </h2>

            <p className="text-gray-600 mt-1 whitespace-pre-wrap">
              {application.notes || "No notes added."}
            </p>
          </div>
        </div>

       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-5 sm:mt-8">
          <Link
            to="/applications"
            className="w-full sm:w-auto text-center border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Back
          </Link>

          <Link
            to={`/edit/${application.id}`}
            className="w-full sm:w-auto bg-blue-500 text-center px-4 py-2 text-white rounded hover:bg-blue-600 transition"
          >
            Edit Application
          </Link>
        </div>
      </div>
     
    </div>
  );
};