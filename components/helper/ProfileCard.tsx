interface ProfileCardProps {
    profile: {
      id: string;
      name: string;
      skills: string[];
      experience: string;
      location: string;
      similarity?: number;
    }
  }
  
  export default function ProfileCard({ profile }: ProfileCardProps) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-green-100 hover:shadow-xl transition-all">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-green-800">{profile.name}</h3>
            <p className="text-green-700 flex items-center mt-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {profile.location}
            </p>
          </div>
          {profile.similarity && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {Math.round(profile.similarity * 100)}% Match
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-stone-600">{profile.experience}</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }