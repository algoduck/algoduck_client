import React from "react";
import { Link } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  return (
    <li className="mb-3">
      <Link to={`/problems/${problem.problemId}`} className="no-underline text-inherit">
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="font-semibold text-lg mb-2">
            {problem.problemNumber}. {problem.title}
          </div>
          <div className="text-sm text-gray-600">난이도: {problem.difficulty}</div>
        </div>
      </Link>
    </li>
  );
};

export default ProblemCard;
