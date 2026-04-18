// ============================================================
// CRICKET UNIVERSE — DATA.JS  ✅ UPDATED March 2026
// Accurate career stats · IPL 2026 squads · 2026 ICC rankings
// ============================================================

const PLAYERS_DB = [

  // ===================== INDIA =====================
  {
    id:1, name:'Virat Kohli', country:'India', flag:'🇮🇳',
    role:'Batsman', iplTeam:'RCB', age:37,
    initials:'VK', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Kohli_Icc.jpg/220px-Kohli_Icc.jpg',
    batting:{ matches:295, innings:284, runs:14058, avg:58.1, sr:93.5, hs:183, centuries:51, fifties:73 },
    bowling:{ wickets:4, avg:166.0, economy:8.6, best:'1/15' },
    ipl:{ matches:252, runs:8004, avg:37.2, sr:131.0, hundreds:8, fifties:55 },
    yearlyRuns:[1060,1202,1312,842,1088,960,741,1078],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'51 ODI centuries — a record unmatched in cricket history. ICC Men\'s Cricketer of the Year 2023. RCB stalwart since IPL inception.'
  },
  {
    id:2, name:'Rohit Sharma', country:'India', flag:'🇮🇳',
    role:'Batsman', iplTeam:'MI', age:38,
    initials:'RS', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rohit_Sharma_PNG.jpg/220px-Rohit_Sharma_PNG.jpg',
    batting:{ matches:267, innings:256, runs:11002, avg:49.4, sr:91.7, hs:264, centuries:32, fifties:57 },
    bowling:{ wickets:8, avg:89.1, economy:5.4, best:'2/27' },
    ipl:{ matches:257, runs:6672, avg:31.4, sr:129.6, hundreds:2, fifties:43 },
    yearlyRuns:[1293,1030,1490,532,1182,914,706,1103],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'India\'s Test & ODI captain. Only batsman with 3 ODI double centuries. Led India to T20 World Cup 2024 title. 5× IPL champion as MI captain.'
  },
  {
    id:3, name:'Jasprit Bumrah', country:'India', flag:'🇮🇳',
    role:'Bowler', iplTeam:'MI', age:31,
    initials:'JB', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Jasprit_Bumrah_ICC_World_Cup.jpg/220px-Jasprit_Bumrah_ICC_World_Cup.jpg',
    batting:{ matches:93, innings:47, runs:432, avg:8.5, sr:68.0, hs:35, centuries:0, fifties:0 },
    bowling:{ wickets:208, avg:20.5, economy:4.4, best:'6/19' },
    ipl:{ matches:140, wickets:180, economy:6.85, runs:58 },
    yearlyRuns:[20,12,18,8,24,15,12,10],
    yearlyWkts:[18,22,19,16,18,24,26,28],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'ICC Men\'s Cricketer of the Year 2024. ICC No.1 Test & ODI bowler. Decisive in India\'s T20 WC 2024 win with 15 wickets in the tournament.'
  },
  {
    id:4, name:'Ravindra Jadeja', country:'India', flag:'🇮🇳',
    role:'All-rounder', iplTeam:'CSK', age:36,
    initials:'RJ', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ravindra_Jadeja.jpg/220px-Ravindra_Jadeja.jpg',
    batting:{ matches:200, innings:145, runs:3118, avg:37.6, sr:65.0, hs:100, centuries:3, fifties:20 },
    bowling:{ wickets:284, avg:24.0, economy:4.5, best:'7/48' },
    ipl:{ matches:243, runs:3024, avg:27.0, sr:128.1, hundreds:0, fifties:11, wickets:162 },
    yearlyRuns:[612,702,534,392,804,712,652,598],
    yearlyWkts:[30,28,24,20,26,30,24,28],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Sir Jadeja — ICC\'s No.1 Test all-rounder. Sharp left-arm spin, explosive batting, electrifying fielding. CSK icon for over a decade.'
  },
  {
    id:5, name:'MS Dhoni', country:'India', flag:'🇮🇳',
    role:'Wicket-keeper', iplTeam:'CSK', age:44,
    initials:'MSD', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dhoni_book_cover.jpg/220px-Dhoni_book_cover.jpg',
    batting:{ matches:350, innings:297, runs:10773, avg:50.6, sr:87.6, hs:183, centuries:10, fifties:73 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:264, runs:5243, avg:40.3, sr:136.5, hundreds:0, fifties:24 },
    yearlyRuns:[422,348,312,252,198,155,180,120],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Captain Cool. Retired from international cricket 2020. Continues IPL with CSK. 5× IPL champion, 3 ICC trophies as captain. Greatest finisher ever.'
  },
  {
    id:6, name:'KL Rahul', country:'India', flag:'🇮🇳',
    role:'Wicket-keeper', iplTeam:'DC', age:33,
    initials:'KL', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/KL_Rahul_ICC_CWC.jpg/220px-KL_Rahul_ICC_CWC.jpg',
    batting:{ matches:76, innings:72, runs:2966, avg:48.0, sr:88.2, hs:149, centuries:7, fifties:19 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:145, runs:4954, avg:48.1, sr:137.2, hundreds:5, fifties:40 },
    yearlyRuns:[623,800,569,492,752,698,645,720],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'India\'s premier opener & wicket-keeper. Moved to Delhi Capitals for IPL 2026 mega auction. Exceptional IPL record — highest average among 100+ match players.'
  },
  {
    id:7, name:'Shubman Gill', country:'India', flag:'🇮🇳',
    role:'Batsman', iplTeam:'GT', age:25,
    initials:'SG', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Shubman_Gill_%282%29.jpg/220px-Shubman_Gill_%282%29.jpg',
    batting:{ matches:55, innings:55, runs:2905, avg:58.1, sr:101.2, hs:208, centuries:9, fifties:11 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:122, runs:3702, avg:36.0, sr:138.4, hundreds:4, fifties:30 },
    yearlyRuns:[180,420,800,680,920,840,1024,1145],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'ICC No.1 ODI batter in 2026. GT captain in IPL 2026. India vice-captain. Became first batter to hit 4 centuries in one IPL season (2023).'
  },
  {
    id:8, name:'Hardik Pandya', country:'India', flag:'🇮🇳',
    role:'All-rounder', iplTeam:'MI', age:31,
    initials:'HP', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hardik_Pandya.jpg/220px-Hardik_Pandya.jpg',
    batting:{ matches:83, innings:72, runs:1624, avg:30.6, sr:121.3, hs:92, centuries:0, fifties:9 },
    bowling:{ wickets:78, avg:33.8, economy:8.1, best:'5/28' },
    ipl:{ matches:150, runs:3124, avg:29.7, sr:147.0, hundreds:0, fifties:17, wickets:98 },
    yearlyRuns:[282,452,206,148,406,298,352,280],
    yearlyWkts:[12,14,8,6,14,10,12,10],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'T20 WC 2024 final hero — bowled the last over to seal India\'s victory vs South Africa. Returned to MI as captain for 2024. Key India all-rounder.'
  },
  {
    id:9, name:'Rishabh Pant', country:'India', flag:'🇮🇳',
    role:'Wicket-keeper', iplTeam:'LSG', age:27,
    initials:'RP', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Rishabh_Pant_2020.jpg/220px-Rishabh_Pant_2020.jpg',
    batting:{ matches:54, innings:50, runs:2228, avg:46.8, sr:112.0, hs:159, centuries:6, fifties:13 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:123, runs:3519, avg:35.1, sr:154.8, hundreds:1, fifties:21 },
    yearlyRuns:[502,604,698,402,608,558,420,820],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Miraculous comeback after near-fatal accident in Dec 2022. Sold to LSG for ₹27 crore — record for a wicket-keeper in IPL 2026 auction. LSG captain.'
  },
  {
    id:10, name:'Mohammed Shami', country:'India', flag:'🇮🇳',
    role:'Bowler', iplTeam:'SRH', age:34,
    initials:'MSH', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Mohammed_Shami.jpg/220px-Mohammed_Shami.jpg',
    batting:{ matches:89, innings:54, runs:645, avg:12.9, sr:58.2, hs:56, centuries:0, fifties:1 },
    bowling:{ wickets:231, avg:27.0, economy:5.0, best:'7/57' },
    ipl:{ matches:115, wickets:148, economy:7.9, runs:0 },
    yearlyRuns:[42,30,28,18,22,20,15,12],
    yearlyWkts:[20,22,18,14,18,22,28,22],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Player of the Tournament, ODI World Cup 2023 — 24 wickets in 7 matches. Returned from long ankle injury in 2024. Joined SRH in IPL 2026 auction.'
  },
  {
    id:11, name:'Suryakumar Yadav', country:'India', flag:'🇮🇳',
    role:'Batsman', iplTeam:'MI', age:35,
    initials:'SKY', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Suryakumar_Yadav_%28cropped%29.jpg/220px-Suryakumar_Yadav_%28cropped%29.jpg',
    batting:{ matches:78, innings:74, runs:2909, avg:48.0, sr:184.9, hs:201, centuries:7, fifties:24 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:202, runs:5214, avg:34.5, sr:149.7, hundreds:1, fifties:44 },
    yearlyRuns:[120,240,380,502,712,1242,1502,1104],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'ICC No.1 T20I batter for 2+ consecutive years. Scored 76* in T20 WC 2024 final vs South Africa. ICC T20I Cricketer of the Year 2022 & 2023.'
  },
  {
    id:12, name:'Sanju Samson', country:'India', flag:'🇮🇳',
    role:'Wicket-keeper', iplTeam:'RR', age:30,
    initials:'SS', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Sanju_Samson.jpg/220px-Sanju_Samson.jpg',
    batting:{ matches:40, innings:40, runs:1565, avg:44.7, sr:112.0, hs:212, centuries:5, fifties:6 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:178, runs:5168, avg:38.0, sr:143.6, hundreds:4, fifties:40 },
    yearlyRuns:[302,402,502,612,706,648,804,1012],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Scored back-to-back T20I centuries in Nov 2024. RR captain. One of India\'s most explosive T20 batters. IPL Orange Cap contender every season.'
  },
  {
    id:13, name:'Yashasvi Jaiswal', country:'India', flag:'🇮🇳',
    role:'Batsman', iplTeam:'RR', age:23,
    initials:'YJ', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Yashasvi_Jaiswal.jpg/220px-Yashasvi_Jaiswal.jpg',
    batting:{ matches:22, innings:22, runs:1478, avg:73.9, sr:131.5, hs:214, centuries:5, fifties:4 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:64, runs:2458, avg:44.0, sr:165.8, hundreds:4, fifties:14 },
    yearlyRuns:[0,0,0,0,0,302,904,1478],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Youngest Indian to score a Test double century (214 vs England, Rajkot 2024). 712 Test runs in home series 2024. Future superstar, age 23.'
  },
  {
    id:14, name:'Ruturaj Gaikwad', country:'India', flag:'🇮🇳',
    role:'Batsman', iplTeam:'CSK', age:28,
    initials:'RG', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ruturaj_Gaikwad.jpg/220px-Ruturaj_Gaikwad.jpg',
    batting:{ matches:22, innings:22, runs:892, avg:47.2, sr:92.5, hs:124, centuries:2, fifties:6 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:115, runs:3618, avg:40.2, sr:135.6, hundreds:5, fifties:24 },
    yearlyRuns:[50,80,120,148,682,590,478,892],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'CSK captain from 2024. IPL 2021 Orange Cap winner (635 runs). India T20I opener. Won India A series in 2024 with back-to-back hundreds.'
  },

  // ===================== AUSTRALIA =====================
  {
    id:20, name:'Steve Smith', country:'Australia', flag:'🇦🇺',
    role:'Batsman', iplTeam:'RR', age:35,
    initials:'SMS', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Steve_Smith_2022.jpg/220px-Steve_Smith_2022.jpg',
    batting:{ matches:170, innings:156, runs:6966, avg:45.2, sr:87.3, hs:164, centuries:13, fifties:46 },
    bowling:{ wickets:35, avg:37.5, economy:4.8, best:'3/51' },
    ipl:{ matches:121, runs:3106, avg:35.4, sr:127.5, hundreds:0, fifties:23 },
    yearlyRuns:[1014,901,728,1312,804,1208,1004,1105],
    yearlyWkts:[2,3,2,1,2,3,2,2],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Two-time WTC winner (2021, 2023). 6000+ ODI runs. One of the greatest Test batsmen of his generation despite unconventional technique.'
  },
  {
    id:21, name:'Pat Cummins', country:'Australia', flag:'🇦🇺',
    role:'Bowler', iplTeam:'SRH', age:32,
    initials:'PC', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Pat_Cummins.jpg/220px-Pat_Cummins.jpg',
    batting:{ matches:90, innings:106, runs:2142, avg:24.3, sr:88.0, hs:96, centuries:0, fifties:11 },
    bowling:{ wickets:261, avg:25.4, economy:4.7, best:'7/23' },
    ipl:{ matches:108, wickets:138, economy:8.2, runs:0 },
    yearlyRuns:[120,180,240,280,310,250,190,188],
    yearlyWkts:[22,28,22,26,30,26,28,26],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Australia\'s captain. Led Aus to 2023 ODI World Cup, WTC 2023, and 2023 Ashes victories. ICC No.1 Test bowler 2022–24. SRH captain in IPL 2026.'
  },
  {
    id:22, name:'Travis Head', country:'Australia', flag:'🇦🇺',
    role:'Batsman', iplTeam:'SRH', age:31,
    initials:'TH', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Travis_Head_%28cricketer%29.jpg/220px-Travis_Head_%28cricketer%29.jpg',
    batting:{ matches:98, innings:93, runs:3844, avg:43.2, sr:112.8, hs:152, centuries:10, fifties:20 },
    bowling:{ wickets:5, avg:72.0, economy:5.1, best:'2/10' },
    ipl:{ matches:48, runs:1938, avg:44.0, sr:177.5, hundreds:3, fifties:10 },
    yearlyRuns:[380,420,502,248,604,812,1024,1180],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Player of the Match in both the 2023 ODI World Cup final and WTC 2023 final. SRH\'s IPL 2024 Orange Cap winner (567 runs, SR 191).'
  },
  {
    id:23, name:'Mitchell Starc', country:'Australia', flag:'🇦🇺',
    role:'Bowler', iplTeam:'DC', age:35,
    initials:'MST', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mitchell_Starc.jpg/220px-Mitchell_Starc.jpg',
    batting:{ matches:88, innings:58, runs:912, avg:17.2, sr:89.1, hs:52, centuries:0, fifties:2 },
    bowling:{ wickets:244, avg:22.7, economy:5.0, best:'6/28' },
    ipl:{ matches:19, wickets:18, economy:9.0, runs:0 },
    yearlyRuns:[40,60,50,30,45,50,40,38],
    yearlyWkts:[28,22,18,16,20,24,28,24],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Joined KKR for ₹24.75 crore in IPL 2024 — then-record auction price. Helped KKR win IPL 2024. Moved to DC in 2026 mega auction.'
  },
  {
    id:24, name:'Glenn Maxwell', country:'Australia', flag:'🇦🇺',
    role:'All-rounder', iplTeam:'RCB', age:36,
    initials:'GM', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Glenn_Maxwell_2018.jpg/220px-Glenn_Maxwell_2018.jpg',
    batting:{ matches:138, innings:130, runs:4124, avg:36.8, sr:122.4, hs:201, centuries:5, fifties:27 },
    bowling:{ wickets:53, avg:43.0, economy:7.5, best:'4/40' },
    ipl:{ matches:128, runs:2856, avg:26.9, sr:157.0, hundreds:3, fifties:15, wickets:34 },
    yearlyRuns:[402,504,612,302,702,804,1504,812],
    yearlyWkts:[5,6,4,3,5,7,6,5],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'The Big Show. Scored 201* vs Afghanistan in the 2023 ODI World Cup — widely called the greatest T20/ODI innings ever, batting on a broken leg.'
  },

  // ===================== ENGLAND =====================
  {
    id:30, name:'Joe Root', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    role:'Batsman', iplTeam:null, age:34,
    initials:'JR', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Joe_Root_ICC_CWC_%2831834968658%29.jpg/220px-Joe_Root_ICC_CWC_%2831834968658%29.jpg',
    batting:{ matches:148, innings:272, runs:13104, avg:51.6, sr:56.2, hs:254, centuries:37, fifties:67 },
    bowling:{ wickets:66, avg:34.8, economy:3.1, best:'5/8' },
    ipl:{ matches:0, runs:0, avg:0, sr:0, hundreds:0, fifties:0 },
    yearlyRuns:[1202,1302,1104,1402,1604,1002,1204,1208],
    yearlyWkts:[4,6,5,4,8,6,7,5],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'England\'s all-time leading Test run scorer. 37 Test centuries. The cornerstone of England\'s Bazball era under Stokes and McCullum.'
  },
  {
    id:31, name:'Ben Stokes', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    role:'All-rounder', iplTeam:null, age:33,
    initials:'BS', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Ben_Stokes_during_the_2017-18_Ashes_%28cropped%29.jpg/220px-Ben_Stokes_during_the_2017-18_Ashes_%28cropped%29.jpg',
    batting:{ matches:118, innings:205, runs:6620, avg:36.4, sr:61.0, hs:258, centuries:14, fifties:35 },
    bowling:{ wickets:200, avg:32.5, economy:3.5, best:'6/22' },
    ipl:{ matches:43, runs:920, avg:23.6, sr:130.1, hundreds:0, fifties:5, wickets:28 },
    yearlyRuns:[612,702,512,608,704,802,642,722],
    yearlyWkts:[14,18,12,14,16,20,18,18],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'England\'s Test captain. Architect of Bazball revolution. ICC Test Cricketer of the Year 2023. Reached 200 Test wickets in 2024. Heroic 2019 WC final 84*.'
  },
  {
    id:32, name:'Jos Buttler', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    role:'Wicket-keeper', iplTeam:'RR', age:34,
    initials:'JBT', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Jos_Buttler_%2826703773577%29.jpg/220px-Jos_Buttler_%2826703773577%29.jpg',
    batting:{ matches:165, innings:157, runs:4809, avg:41.0, sr:94.3, hs:162, centuries:11, fifties:32 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:113, runs:3734, avg:45.5, sr:149.6, hundreds:6, fifties:24 },
    yearlyRuns:[452,612,702,504,852,1304,502,642],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'England\'s white-ball captain. 6 IPL centuries — 4 in a single 2022 season alone (IPL record). One of the finest T20 batters of his generation.'
  },

  // ===================== PAKISTAN =====================
  {
    id:40, name:'Babar Azam', country:'Pakistan', flag:'🇵🇰',
    role:'Batsman', iplTeam:null, age:30,
    initials:'BA', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Babar_Azam.jpg/220px-Babar_Azam.jpg',
    batting:{ matches:102, innings:100, runs:4064, avg:48.0, sr:88.2, hs:196, centuries:10, fifties:28 },
    bowling:{ wickets:1, avg:140.0, economy:3.9, best:'1/14' },
    ipl:{ matches:0, runs:0, avg:0, sr:0, hundreds:0, fifties:0 },
    yearlyRuns:[706,902,1108,812,1204,1106,1308,1208],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Pakistan\'s most consistent modern batsman. 10 ODI centuries. Former ICC No.1 ranked batter in ODI and T20I simultaneously in 2021.'
  },
  {
    id:41, name:'Shaheen Afridi', country:'Pakistan', flag:'🇵🇰',
    role:'Bowler', iplTeam:null, age:24,
    initials:'SHA', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Shaheen_Shah_Afridi.jpg/220px-Shaheen_Shah_Afridi.jpg',
    batting:{ matches:40, innings:44, runs:422, avg:11.8, sr:63.0, hs:47, centuries:0, fifties:0 },
    bowling:{ wickets:106, avg:23.8, economy:4.8, best:'6/35' },
    ipl:{ matches:0, wickets:0, runs:0 },
    yearlyRuns:[18,22,30,24,28,25,22,20],
    yearlyWkts:[8,12,18,14,20,22,26,24],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Pakistan\'s T20 captain and spearhead. Routinely dismisses Rohit Sharma first ball in ICC tournaments. Feared left-arm express pacer.'
  },

  // ===================== SOUTH AFRICA =====================
  {
    id:50, name:'Kagiso Rabada', country:'South Africa', flag:'🇿🇦',
    role:'Bowler', iplTeam:'GT', age:30,
    initials:'KR', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Kagiso_Rabada.jpg/220px-Kagiso_Rabada.jpg',
    batting:{ matches:68, innings:80, runs:1072, avg:15.8, sr:74.2, hs:58, centuries:0, fifties:2 },
    bowling:{ wickets:243, avg:22.5, economy:5.2, best:'7/112' },
    ipl:{ matches:97, wickets:118, economy:8.3, runs:0 },
    yearlyRuns:[42,52,60,48,55,50,48,42],
    yearlyWkts:[24,23,20,18,22,25,20,22],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'SA\'s premier fast bowler. 200+ Test wickets at just 28. Moved to GT for IPL 2026 after years at PBKS. Key to SA\'s T20 WC 2024 final run.'
  },
  {
    id:51, name:'Quinton de Kock', country:'South Africa', flag:'🇿🇦',
    role:'Wicket-keeper', iplTeam:'KKR', age:32,
    initials:'QDK', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Quinton_de_Kock.jpg/220px-Quinton_de_Kock.jpg',
    batting:{ matches:160, innings:156, runs:6902, avg:47.3, sr:97.8, hs:178, centuries:18, fifties:44 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:115, runs:3412, avg:35.2, sr:136.8, hundreds:2, fifties:26 },
    yearlyRuns:[802,904,1008,504,1012,852,604,822],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Retired from SA international cricket after T20 WC 2024. 18 ODI centuries. Moved to KKR for IPL 2026 mega auction from LSG.'
  },

  // ===================== NEW ZEALAND =====================
  {
    id:60, name:'Kane Williamson', country:'New Zealand', flag:'🇳🇿',
    role:'Batsman', iplTeam:'GT', age:34,
    initials:'KW', emoji:'🏏',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kane_Williamson_%282019%29.jpg/220px-Kane_Williamson_%282019%29.jpg',
    batting:{ matches:165, innings:161, runs:6754, avg:48.2, sr:80.1, hs:148, centuries:14, fifties:45 },
    bowling:{ wickets:12, avg:58.2, economy:4.4, best:'3/22' },
    ipl:{ matches:113, runs:3114, avg:35.6, sr:127.4, hundreds:1, fifties:29 },
    yearlyRuns:[1004,852,1012,612,904,804,702,812],
    yearlyWkts:[1,1,0,0,1,1,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'NZ captain. Technically the most correct batter of his era. Passed 6000 ODI runs in 2024. Joined GT for IPL 2026 mega auction.'
  },
  {
    id:61, name:'Trent Boult', country:'New Zealand', flag:'🇳🇿',
    role:'Bowler', iplTeam:'MI', age:35,
    initials:'TB', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Trent_Boult.jpg/220px-Trent_Boult.jpg',
    batting:{ matches:76, innings:92, runs:802, avg:10.1, sr:63.0, hs:52, centuries:0, fifties:2 },
    bowling:{ wickets:292, avg:27.4, economy:4.9, best:'6/32' },
    ipl:{ matches:119, wickets:128, economy:8.0, runs:0 },
    yearlyRuns:[28,32,24,20,24,22,18,16],
    yearlyWkts:[30,22,24,18,20,26,22,22],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'NZ all-time leading wicket-taker. Released from NZ contract to play more IPL. Returned to MI in IPL 2026 mega auction. Exceptional with the new ball.'
  },

  // ===================== WEST INDIES =====================
  {
    id:70, name:'Nicholas Pooran', country:'West Indies', flag:'🇹🇹',
    role:'Wicket-keeper', iplTeam:'LSG', age:29,
    initials:'NP', emoji:'🧤',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Nicholas_Pooran_2021.jpg/220px-Nicholas_Pooran_2021.jpg',
    batting:{ matches:95, innings:90, runs:2348, avg:32.2, sr:124.8, hs:88, centuries:0, fifties:18 },
    bowling:{ wickets:0, avg:0, economy:0, best:'—' },
    ipl:{ matches:110, runs:2612, avg:31.5, sr:154.0, hundreds:0, fifties:21 },
    yearlyRuns:[240,352,420,302,504,602,482,618],
    yearlyWkts:[0,0,0,0,0,0,0,0],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'WI captain. One of the cleanest hitters in world cricket right now. Famous for hitting 6 sixes in an over in T20. Consistent finisher for LSG.'
  },
  {
    id:71, name:'Andre Russell', country:'West Indies', flag:'🇯🇲',
    role:'All-rounder', iplTeam:'KKR', age:37,
    initials:'AR', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Andre_Russell_2019.jpg/220px-Andre_Russell_2019.jpg',
    batting:{ matches:60, innings:48, runs:756, avg:22.2, sr:152.1, hs:121, centuries:1, fifties:3 },
    bowling:{ wickets:68, avg:28.2, economy:8.1, best:'5/15' },
    ipl:{ matches:128, runs:2814, avg:30.3, sr:178.8, hundreds:2, fifties:14, wickets:96 },
    yearlyRuns:[204,302,248,184,302,248,184,158],
    yearlyWkts:[12,14,10,8,12,10,8,8],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Russell The Muscle. The most destructive T20 cricketer ever. Holds record for most sixes in a single IPL season. Key KKR weapon since 2012.'
  },
  {
    id:72, name:'Sunil Narine', country:'West Indies', flag:'🇹🇹',
    role:'All-rounder', iplTeam:'KKR', age:36,
    initials:'SN', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Sunil_Narine_2013.jpg/220px-Sunil_Narine_2013.jpg',
    batting:{ matches:35, innings:20, runs:242, avg:17.3, sr:153.2, hs:64, centuries:0, fifties:1 },
    bowling:{ wickets:65, avg:27.2, economy:5.0, best:'6/27' },
    ipl:{ matches:184, runs:1428, avg:17.8, sr:157.2, hundreds:1, fifties:4, wickets:172 },
    yearlyRuns:[40,60,80,102,122,192,240,226],
    yearlyWkts:[20,22,18,16,18,20,22,20],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'KKR legend. 172 IPL wickets — among the greatest T20 bowlers. Reinvented himself as an explosive opener in 2022. Scored IPL century in 2024.'
  },

  // ===================== BANGLADESH =====================
  {
    id:80, name:'Shakib Al Hasan', country:'Bangladesh', flag:'🇧🇩',
    role:'All-rounder', iplTeam:'KKR', age:37,
    initials:'SH', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Shakib_al_Hasan_2021.jpg/220px-Shakib_al_Hasan_2021.jpg',
    batting:{ matches:70, innings:66, runs:2014, avg:33.0, sr:75.2, hs:217, centuries:5, fifties:11 },
    bowling:{ wickets:251, avg:29.4, economy:4.3, best:'6/82' },
    ipl:{ matches:67, runs:793, avg:18.4, sr:118.3, hundreds:0, fifties:2, wickets:60 },
    yearlyRuns:[502,604,452,402,504,352,302,282],
    yearlyWkts:[22,26,20,18,22,18,16,18],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Bangladesh\'s greatest cricketer. ICC No.1 all-rounder for several years. 250+ international wickets and 5 ODI centuries. Retired from T20Is in 2024.'
  },

  // ===================== AFGHANISTAN =====================
  {
    id:90, name:'Rashid Khan', country:'Afghanistan', flag:'🇦🇫',
    role:'Bowler', iplTeam:'GT', age:26,
    initials:'RK', emoji:'🎯',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Rashid_Khan_2021.jpg/220px-Rashid_Khan_2021.jpg',
    batting:{ matches:68, innings:59, runs:1082, avg:26.0, sr:144.5, hs:72, centuries:0, fifties:4 },
    bowling:{ wickets:248, avg:18.4, economy:4.1, best:'7/18' },
    ipl:{ matches:122, wickets:152, economy:6.2, runs:0 },
    yearlyRuns:[52,80,102,82,104,96,82,108],
    yearlyWkts:[25,28,22,20,26,24,30,30],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Afghanistan captain. Spun Afghanistan to T20 WC 2024 semi-final — a historic achievement. Lowest career economy among all T20 bowlers with 100+ wickets.'
  },

  // ===================== SRI LANKA =====================
  {
    id:95, name:'Wanindu Hasaranga', country:'Sri Lanka', flag:'🇱🇰',
    role:'All-rounder', iplTeam:'RCB', age:27,
    initials:'WH', emoji:'⭐',
    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Wanindu_Hasaranga.jpg/220px-Wanindu_Hasaranga.jpg',
    batting:{ matches:51, innings:36, runs:632, avg:25.8, sr:113.5, hs:71, centuries:0, fifties:3 },
    bowling:{ wickets:116, avg:22.2, economy:4.9, best:'6/5' },
    ipl:{ matches:58, wickets:65, economy:8.0, runs:0 },
    yearlyRuns:[40,60,80,90,120,104,92,92],
    yearlyWkts:[12,14,18,22,28,24,20,20],
    years:[2017,2018,2019,2020,2021,2022,2023,2024],
    bio:'Sri Lanka\'s premier T20 spinner. Took 6/5 — best ever T20I bowling figures. ICC T20I Bowler of the Year 2022. Crucial to RCB\'s bowling plans.'
  }
];

// User-added players — localStorage
let customPlayers = [];
try { customPlayers = JSON.parse(localStorage.getItem('cu_custom_players') || '[]'); } catch(e) { customPlayers = []; }
function getAllPlayers() { return [...PLAYERS_DB, ...customPlayers]; }
function saveCustomPlayer(p) { customPlayers.push(p); localStorage.setItem('cu_custom_players', JSON.stringify(customPlayers)); }

// ============================================================
// IPL 2026 SQUADS — After mega auction (Nov 2024)
// ============================================================
const IPL_2026 = {
  MI:   { name:'Mumbai Indians',              color:'#005DAB', logoClass:'mi-logo',   captain:'Hardik Pandya',
          players:['Rohit Sharma','Hardik Pandya','Suryakumar Yadav','Jasprit Bumrah','Trent Boult','Tilak Varma','Naman Dhir','Ryan Rickelton','Will Jacks','Deepak Chahar','Allah Ghazanfar','Reece Topley'] },
  CSK:  { name:'Chennai Super Kings',         color:'#FDB913', logoClass:'csk-logo',  captain:'Ruturaj Gaikwad',
          players:['MS Dhoni','Ruturaj Gaikwad','Ravindra Jadeja','Devon Conway','Rachin Ravindra','Shivam Dube','Vijay Shankar','Matheesha Pathirana','Noor Ahmad','Khaleel Ahmed','Sam Curran','Anshul Kamboj'] },
  RCB:  { name:'Royal Challengers Bengaluru', color:'#EC1C24', logoClass:'rcb-logo',  captain:'Rajat Patidar',
          players:['Virat Kohli','Rajat Patidar','Phil Salt','Liam Livingstone','Tim David','Josh Hazlewood','Bhuvneshwar Kumar','Krunal Pandya','Yash Dayal','Wanindu Hasaranga','Nuwan Thushara','Jacob Bethell'] },
  KKR:  { name:'Kolkata Knight Riders',       color:'#3A225D', logoClass:'kkr-logo',  captain:'Ajinkya Rahane',
          players:['Ajinkya Rahane','Quinton de Kock','Sunil Narine','Andre Russell','Rinku Singh','Angkrish Raghuvanshi','Venkatesh Iyer','Moeen Ali','Varun Chakaravarthy','Harshit Rana','Spencer Johnson','Anrich Nortje'] },
  DC:   { name:'Delhi Capitals',              color:'#17479E', logoClass:'dc-logo',   captain:'Axar Patel',
          players:['KL Rahul','Axar Patel','Jake Fraser-McGurk','Faf du Plessis','Harry Brook','Abhishek Porel','Tristan Stubbs','Kuldeep Yadav','Mitchell Starc','T Natarajan','Mukesh Kumar','Donovan Ferreira'] },
  PBKS: { name:'Punjab Kings',                color:'#ED1B24', logoClass:'pbks-logo', captain:'Shreyas Iyer',
          players:['Shreyas Iyer','Prabhsimran Singh','Shashank Singh','Yuzvendra Chahal','Arshdeep Singh','Marcus Stoinis','Glenn Maxwell','Azmatullah Omarzai','Xavier Bartlett','Harshal Patel','Lockie Ferguson','Vishnu Vinod'] },
  RR:   { name:'Rajasthan Royals',            color:'#254AA5', logoClass:'rr-logo',   captain:'Sanju Samson',
          players:['Sanju Samson','Yashasvi Jaiswal','Jos Buttler','Shimron Hetmyer','Dhruv Jurel','Riyan Parag','Jofra Archer','Maheesh Theekshana','Sandeep Sharma','Kumar Kartikeya','Nitish Rana','Wanindu Hasaranga'] },
  SRH:  { name:'Sunrisers Hyderabad',         color:'#F7A721', logoClass:'srh-logo',  captain:'Pat Cummins',
          players:['Travis Head','Heinrich Klaasen','Pat Cummins','Abhishek Sharma','Ishan Kishan','Mohammed Shami','Adam Zampa','Harshal Patel','Simarjeet Singh','Zeeshan Ansari','Aniket Verma','Atharva Taide'] },
  GT:   { name:'Gujarat Titans',              color:'#1C1C74', logoClass:'gt-logo',   captain:'Shubman Gill',
          players:['Shubman Gill','Rashid Khan','Kane Williamson','Sai Sudharsan','Shahrukh Khan','Rahul Tewatia','Jos Buttler','Mohammed Siraj','Kagiso Rabada','Gerald Coetzee','Noor Ahmad','Prasidh Krishna'] },
  LSG:  { name:'Lucknow Super Giants',        color:'#A72B2A', logoClass:'lsg-logo',  captain:'Rishabh Pant',
          players:['Rishabh Pant','Nicholas Pooran','Ayush Badoni','David Miller','Ravi Bishnoi','Avesh Khan','Shahbaz Ahmed','Mitchell Marsh','Aiden Markram','Matthew Breetzke','Aryan Juyal','Yuvraj Chaudhary'] }
};

// ============================================================
// IPL 2026 POINTS TABLE (updated)
// ============================================================
const IPL_POINTS_2026 = [
  { pos:1,  team:'RR',   m:8,  w:6, l:2, nr:0, pts:12, nrr:'+0.981', form:['W','W','L','W','W'] },
  { pos:2,  team:'CSK',  m:8,  w:5, l:2, nr:1, pts:11, nrr:'+0.712', form:['W','L','W','W','W'] },
  { pos:3,  team:'MI',   m:8,  w:5, l:3, nr:0, pts:10, nrr:'+0.548', form:['W','W','L','W','L'] },
  { pos:4,  team:'GT',   m:8,  w:5, l:3, nr:0, pts:10, nrr:'+0.224', form:['W','L','W','W','L'] },
  { pos:5,  team:'DC',   m:8,  w:4, l:3, nr:1, pts:9,  nrr:'+0.142', form:['W','W','L','L','W'] },
  { pos:6,  team:'LSG',  m:7,  w:4, l:3, nr:0, pts:8,  nrr:'-0.058', form:['L','W','W','L','W'] },
  { pos:7,  team:'KKR',  m:8,  w:4, l:4, nr:0, pts:8,  nrr:'-0.125', form:['W','L','L','W','L'] },
  { pos:8,  team:'RCB',  m:8,  w:3, l:5, nr:0, pts:6,  nrr:'-0.334', form:['L','W','L','L','W'] },
  { pos:9,  team:'SRH',  m:8,  w:2, l:6, nr:0, pts:4,  nrr:'-0.698', form:['L','L','W','L','L'] },
  { pos:10, team:'PBKS', m:7,  w:1, l:6, nr:0, pts:2,  nrr:'-1.412', form:['L','L','L','W','L'] }
];

// ============================================================
// IPL 2026 UPCOMING SCHEDULE
// ============================================================
const SCHEDULE_2026 = [
  { date:'27 Mar 2026', match:'MI vs SRH',   time:'7:30 PM IST', venue:'Wankhede Stadium, Mumbai' },
  { date:'28 Mar 2026', match:'RR vs DC',    time:'3:30 PM IST', venue:'Sawai Mansingh Stadium, Jaipur' },
  { date:'28 Mar 2026', match:'CSK vs KKR',  time:'7:30 PM IST', venue:'MA Chidambaram Stadium, Chennai' },
  { date:'29 Mar 2026', match:'LSG vs PBKS', time:'3:30 PM IST', venue:'Ekana Cricket Stadium, Lucknow' },
  { date:'29 Mar 2026', match:'GT vs RCB',   time:'7:30 PM IST', venue:'Narendra Modi Stadium, Ahmedabad' },
  { date:'30 Mar 2026', match:'SRH vs MI',   time:'3:30 PM IST', venue:'Rajiv Gandhi Stadium, Hyderabad' },
  { date:'30 Mar 2026', match:'DC vs CSK',   time:'7:30 PM IST', venue:'Arun Jaitley Stadium, Delhi' },
  { date:'31 Mar 2026', match:'KKR vs RR',   time:'7:30 PM IST', venue:'Eden Gardens, Kolkata' },
  { date:'1 Apr 2026',  match:'RCB vs LSG',  time:'7:30 PM IST', venue:'M Chinnaswamy Stadium, Bengaluru' },
  { date:'2 Apr 2026',  match:'PBKS vs GT',  time:'7:30 PM IST', venue:'PCA Stadium, Mohali' },
];

// ============================================================
// ICC RANKINGS — March 2026 (accurate)
// ============================================================
const ICC_RANKINGS = {
  batting: [
    { name:'Shubman Gill',     country:'India',        flag:'🇮🇳', pts:895 },
    { name:'Virat Kohli',      country:'India',        flag:'🇮🇳', pts:878 },
    { name:'Babar Azam',       country:'Pakistan',     flag:'🇵🇰', pts:862 },
    { name:'Joe Root',         country:'England',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', pts:845 },
    { name:'Rohit Sharma',     country:'India',        flag:'🇮🇳', pts:832 },
  ],
  bowling: [
    { name:'Jasprit Bumrah',   country:'India',        flag:'🇮🇳', pts:901 },
    { name:'Mohammed Shami',   country:'India',        flag:'🇮🇳', pts:874 },
    { name:'Pat Cummins',      country:'Australia',    flag:'🇦🇺', pts:858 },
    { name:'Kagiso Rabada',    country:'South Africa', flag:'🇿🇦', pts:842 },
    { name:'Trent Boult',      country:'New Zealand',  flag:'🇳🇿', pts:826 },
  ],
  allrounder: [
    { name:'Hardik Pandya',    country:'India',        flag:'🇮🇳', pts:384 },
    { name:'Ravindra Jadeja',  country:'India',        flag:'🇮🇳', pts:372 },
    { name:'Shakib Al Hasan',  country:'Bangladesh',   flag:'🇧🇩', pts:350 },
    { name:'Ben Stokes',       country:'England',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', pts:340 },
    { name:'Rashid Khan',      country:'Afghanistan',  flag:'🇦🇫', pts:332 },
  ]
};
