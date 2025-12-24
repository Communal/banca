import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Job Data ---
const jobsData = [
  {
    title: "Relationship Manager",
    location: "New Delhi, India",
    department: "Retail Banking",
    about:
      "As a Relationship Manager at Montedeiazzu, you will be the primary point of contact for our valued customers. You will be responsible for building and maintaining strong relationships, understanding their financial needs, and providing personalized solutions. Your goal will be to enhance customer satisfaction and drive business growth through effective cross-selling and client retention strategies.",
    requirements: [
      "Bachelor's degree in Business, Finance, or a related field.",
      "Minimum of 3-5 years of experience in banking or relationship management.",
      "Strong interpersonal and communication skills.",
      "Proven track record of meeting sales targets and building client relationships.",
      "In-depth knowledge of banking products and services.",
    ],
  },
  {
    title: "Risk Analyst",
    location: "Mumbai, India",
    department: "Risk Management",
    about:
      "As a Risk Analyst at Montedeiazzu, you will play a vital role in identifying, assessing, and mitigating risks across our operations. You will utilize advanced analytical tools and models to evaluate credit, market, and operational risks. Your insights will contribute to informed decision-making and ensure regulatory compliance, safeguarding the bank's financial stability and reputation.",
    requirements: [
      "Bachelor's degree in Finance, Economics, Mathematics, or related field.",
      "Minimum of 2-4 years of experience in risk management or financial analysis.",
      "Strong analytical and problem-solving skills.",
      "Proficiency in data analysis tools (e.g., Excel, SQL, Python).",
      "Knowledge of regulatory frameworks and risk assessment methodologies.",
    ],
  },
  {
    title: "IT Security Specialist",
    location: "Bangalore, India",
    department: "Information Technology",
    about:
      "As an IT Security Specialist at Montedeiazzu, you will be responsible for protecting our systems, networks, and data from cyber threats. You will implement security measures, monitor for vulnerabilities, and respond to security incidents. Your expertise will ensure the confidentiality, integrity, and availability of our critical information assets.",
    requirements: [
      "Bachelor's degree in Computer Science, Information Security, or related field.",
      "Minimum of 5+ years of experience in IT security.",
      "Strong knowledge of cybersecurity principles, technologies, and best practices.",
      "Certifications such as CISSP, CISM, or CEH are highly desirable.",
      "Experience with security tools (e.g., firewalls, IDS/IPS, SIEM).",
    ],
  },
];

const JobOpenings = () => {
  return (
    <section className="py-20 container mx-auto px-4" id="openings">
      {/* --- Section Header --- */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">
          Job <span className="text-brand-accent">Openings</span>
        </h2>
        <p className="text-gray-600 max-w-3xl">
          Explore exciting career opportunities at Montedeiazzu and join our team of
          dedicated professionals. We are always looking for talented
          individuals who are passionate about making a difference in the
          banking industry.
        </p>
      </div>

      {/* --- Job Cards List --- */}
      <div className="flex flex-col gap-8">
        {jobsData.map((job, index) => (
          <div
            key={index}
            className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-8 transition-all hover:shadow-md"
          >
            {/* Top Row: Title & Tags */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-primary">
                {job.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                  Location: {job.location}
                </span>
                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                  Department: {job.department}
                </span>
              </div>
            </div>

            {/* About This Job */}
            <div>
              <h4 className="text-lg font-bold text-brand-primary mb-3">
                About This Job
              </h4>
              <p className="text-gray-600 leading-relaxed">{job.about}</p>
            </div>

            {/* Requirements list */}
            <div>
              <h4 className="text-lg font-bold text-brand-primary mb-3">
                Requirements
              </h4>
              <ul className="flex flex-col gap-3">
                {job.requirements.map((req, reqIndex) => (
                  <li
                    key={reqIndex}
                    className="flex gap-3 items-start text-gray-600"
                  >
                    {/* Using Briefcase icon as the bullet point */}
                    <Briefcase
                      size={20}
                      className="text-brand-accent shrink-0 mt-1"
                      fill="currentColor"
                      opacity={0.8}
                    />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            <div>
              <Button className="rounded-full bg-brand-accent hover:bg-blue-700 text-white px-8 py-6 text-lg font-medium">
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobOpenings;
