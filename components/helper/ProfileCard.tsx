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
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.location}</p>
          </div>
          {profile.similarity && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {Math.round(profile.similarity * 100)}% Match
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">{profile.experience}</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }