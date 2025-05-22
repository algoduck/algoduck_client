import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  return (
    <li className="mb-3">
      <Link to={`/problems/${problem.problemId}`} className="no-underline text-inherit">
        <div className="p-4 transition-colors border border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="mb-2 text-lg font-semibold">
            {problem.problemNumber}. {problem.title}
          </div>
          <div className="text-sm text-gray-600">난이도: {problem.difficulty}</div>
        </div>
      </Link>
    </li>
  );
};

export default ProblemCard;
