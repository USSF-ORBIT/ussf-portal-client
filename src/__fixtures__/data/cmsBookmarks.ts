/* This file is meant to mirror the bookmarks that we get from the CMS.
    In the CustomCollection component, there is a function called findBookmark()
    that takes the cmsId from a bookmark in MongoDB and finds the corresponding bookmark
    in the CMS to display in the user's MySpace. The bookmark coming from MongoDB will
    need to have a cmsId value that matches any id value in this file. */
export const cmsBookmarksMock = [
  {
    id: '1',
    url: 'www.example.com/1',
    label: 'MyVector',
    description: 'Manage your desired career path.',
  },
  {
    id: '2',
    url: 'www.example.com/2',
    label: 'SURF',
    description: 'A one page summary of your career found on AMS',
  },
  {
    id: '3',
    url: 'www.example.com/3',
    label: 'Orders',
    description: 'View PCS orders through vMPF.',
  },
  {
    id: '4',
    url: 'www.example.com/4',
    label: 'EPRs/OPRs',
    description: 'View EPRs/OPRs in PRDA.',
  },
  {
    id: '5',
    url: 'www.example.com/5',
    label: 'PRDA',
    description: 'The official location of your personnel records.',
  },
  {
    id: '6',
    url: 'www.example.com/6',
    label: 'MyPers',
    description: 'The official source of Human Resources information.',
  },
  {
    id: '7',
    url: 'www.example.com/7',
    label: 'vMPF',
    description: 'View your deployment band and other MPF information.',
  },
  {
    id: '8',
    url: 'www.example.com/8',
    label: 'Alpha Rosters',
    description: '',
  },
  {
    id: '9',
    url: 'www.example.com/9',
    label: 'vRED',
    description: 'View and update your virtual record of emergency data.',
  },
  {
    id: '10',
    url: 'www.example.com/10',
    label: 'Outprocessing Checklists',
    description: 'View your out-processing checklist on vMPF.',
  },
  {
    id: '11',
    url: 'www.example.com/11',
    label: 'TriCare Online (TOL)',
    description: 'Make appointments and communicate with your MTF.',
  },
  {
    id: '12',
    url: 'www.example.com/12',
    label: 'Dental',
    description: '',
  },
  {
    id: '13',
    url: 'www.example.com/13',
    label: 'PT Tests',
    description: 'View your PT Test scores.',
  },
  {
    id: '14',
    url: 'www.example.com/14',
    label: 'MilConnect',
    description:
      'Review personal, health care, and personnel information from one reliable source, the Defense Enrollment Eligibility Reporting System (DEERS)',
  },
  {
    id: '15',
    url: 'www.example.com/15',
    label: 'LeaveWeb',
    description: 'The tracking system for requesting and tracking leave.',
  },
  {
    id: '16',
    url: 'www.example.com/16',
    label: 'MyFSS',
    description:
      'The new customer relationship management portal for all A1 mission area functions and applications',
  },
  {
    id: '17',
    url: 'www.example.com/17',
    label: 'MyPay',
    description:
      'MyPay allows you to manage your pay information, leave and earning statements, W-2s, and more.',
  },
  {
    id: '18',
    url: 'www.example.com/18',
    label: 'TSP',
    description: 'View and change your TSP allotments and balances.',
  },
  {
    id: '19',
    url: 'www.example.com/19',
    label: 'Assignments',
    description: '',
  },
  {
    id: '20',
    url: 'www.example.com/20',
    label: 'Move.mil',
    description: 'Access all your PCS info.',
  },
  {
    id: '21',
    url: 'www.example.com/21',
    label: 'GTCC',
    description: 'View and pay your Government travel card.',
  },
  {
    id: '22',
    url: 'www.example.com/22',
    label: 'DTS',
    description:
      'Generate travel authorizations, make trip reservations, and route travel requests for approval, using DTS.',
  },
  {
    id: '23',
    url: 'www.example.com/23',
    label: 'CSP',
    description: 'Finance customer service. ',
  },
  {
    id: '24',
    url: 'www.example.com/24',
    label: 'vFinance',
    description: '',
  },
  {
    id: '25',
    url: 'www.example.com/25',
    label: 'Military Onesource',
    description:
      'Department of Defense-funded program providing comprehensive information on every aspect of military life at no cost to active duty, the National Guard, Reserve members, and their families. ',
  },
  {
    id: '26',
    url: 'www.example.com/26',
    label: 'TAP',
    description:
      'Provides information, tools, and training to ensure service members, and their spouses, are prepared for the next step in civilian life.',
  },
  {
    id: '27',
    url: 'www.example.com/27',
    label: 'VML Announcements',
    description: '',
  },
  {
    id: '28',
    url: 'www.example.com/28',
    label: 'PAS Code Lookups',
    description:
      'Search for current PAS code information for worldwide Air Force users. ',
  },
  {
    id: '29',
    url: 'www.example.com/29',
    label: 'BLSDM',
    description:
      'The system provides commanders the capability to produce queries and reports on individual members, request actions to be taken, and query personnel data.',
  },
  {
    id: '30',
    url: 'www.example.com/30',
    label: 'AFECD',
    description:
      'Air Force Enlisted Classification Directory / Air Force Officer Classification Directory',
  },
  {
    id: '31',
    url: 'www.example.com/31',
    label: 'AFVEC',
    description:
      'AFVEC provides information on Voluntary Education Benefits and offers a variety of self-service applications to Air Force members.',
  },
  {
    id: '32',
    url: 'www.example.com/32',
    label: 'Space Force Reddit',
    description: '',
  },
  {
    id: '33',
    url: 'www.example.com/33',
    label: 'USSF Twitter',
    description: '',
  },
  {
    id: '34',
    url: 'www.example.com/34',
    label: 'MS Teams',
    description: '',
  },
  {
    id: '35',
    url: 'www.example.com/35',
    label: 'Space Force Facebook',
    description: '',
  },
  {
    id: '36',
    url: 'www.example.com/36',
    label: 'Spaceforce.mil',
    description: '',
  },
  {
    id: '37',
    url: 'www.example.com/37',
    label: 'Navy.mil',
    description: '',
  },
  {
    id: '38',
    url: 'www.example.com/38',
    label: 'Army.mil',
    description: '',
  },
  {
    id: '39',
    url: 'www.example.com/39',
    label: 'USCG.mil',
    description: '',
  },
  {
    id: '40',
    url: 'www.example.com/40',
    label: 'DoD',
    description: '',
  },
  {
    id: '41',
    url: 'www.example.com/41',
    label: 'Marines.mil',
    description: '',
  },
  {
    id: '42',
    url: 'www.example.com/42',
    label: 'Air University',
    description: 'A center for professional military education (PME)',
  },
  {
    id: '43',
    url: 'www.example.com/43',
    label: 'Community College of the Air Force',
    description: 'A federally-chartered degree-granting institution',
  },
  {
    id: '44',
    url: 'www.example.com/44',
    label: 'SF on LinkedIn',
    description: '',
  },
  {
    id: '45',
    url: 'www.example.com/45',
    label: 'ATAAPS',
    description:
      'Automated Time Attendance and Production System. An automated system for entering civilian time and attendance.',
  },
  {
    id: '46',
    url: 'www.example.com/46',
    label: 'AcqDemo/Cas2Net',
    description: 'Civilian performance review system',
  },
  {
    id: '47',
    url: 'www.example.com/47',
    label: 'AFOCD',
    description: 'Officer Classification Directory.',
  },
  {
    id: '48',
    url: 'www.example.com/48',
    label: 'AFVEC',
    description: 'Virtual Education Center.',
  },
  {
    id: '49',
    url: 'www.example.com/49',
    label: 'ACES',
    description:
      'Provides direct Civil Engineer information management support to active Air Force units, the Air National Guard, and the Air Force Reserve, during peace and war, at fixed main bases, bare bases, and deployed locations.',
  },
  {
    id: '50',
    url: 'www.example.com/50',
    label: 'ACMS',
    description:
      'The system for supporting the implementation of the Defense Acquisition Workforce Improvement Act (DAWIA) and Acquisition Professional Development Program (APDP).',
  },
]
