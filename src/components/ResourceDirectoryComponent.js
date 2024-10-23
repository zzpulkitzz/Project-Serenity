import React from 'react';

const resources = [
  {
    title: 'Understanding Anxiety and Depression',
    description:
      'Learn about the symptoms and coping strategies for anxiety and depression.',
    link: 'https://www.who.int/news-room/fact-sheets/detail/depression',
    bgColor: 'bg-sky-300'
  },
  {
    title: 'Mental Health Helpline Numbers',
    description: 'Call these helpline numbers for immediate support.',
    link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1652240',
    bgColor: 'bg-red-300'
  },
  {
    title: 'Mindfulness Exercises',
    description:
      'Try guided mindfulness and breathing exercises to reduce stress.',
    link: 'https://www.headspace.com/',
    bgColor: 'bg-green-300'
  },
  {
    title: 'Suicide Prevention Resources',
    description:
      'Know how to help yourself or someone in crisis with these resources.',
    link: 'https://suicidepreventionlifeline.org/',
    bgColor: 'bg-yellow-400'
  },
  {
    title: 'Mental Health Awareness Videos',
    description:
      'Watch inspiring videos to maintain good mental health.',
    link: 'https://youtube.com/playlist?list=PL9R60GF3QwoOpd0vu-8141kEUcJ_efFK9&si=ZPu6ySJXeSuUVfZM',
    bgColor: 'bg-emerald-400'
  }
];

const ResourceDirectoryComponent = () => {
  return (
    <div className="flex flex-wrap mx-auto gap-6 w-full max-w-[80vw] justify-center mt-8">
      {resources.map((resource, index) => (
        <div
          key={index}
          className={`card max-w-[20vw] border-2 border-black rounded-3xl p-8 flex flex-col ${resource.bgColor} max-h-[50vh] transition-transform duration-200`}>
          <div className="font-semibold text-xl mb-4">{resource.title}</div>
          <p className="mb-4">{resource.description}</p>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-blue-600 px-4 py-2 rounded-full text-center self-center">
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
};

export default ResourceDirectoryComponent;