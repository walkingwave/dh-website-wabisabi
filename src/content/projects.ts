export interface Project {
  slug: string;
  id: string;
  title: string;
  // the half sentence under the tile
  blurb: string;
  shortDescription: string;
  tags: string[];
  period: string;
  overview: string;
  highlights: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  diagram?: { src: string; alt: string };
  // optional: proper write-up, each string is a paragraph
  writeup?: string[];
  // optional: main image for the project (path in /public)
  image?: { src: string; alt: string };
  // optional: multiple images / diagrams shown on the detail page
  images?: { src: string; alt: string; caption?: string }[];
  // optional: external link to the live project
  link?: { label: string; href: string };
  // how the project shows up on its card and at the top of its page
  cover: Cover;
  // featured projects get the big tiles
  featured?: boolean;
}

export type Cover = {
  kind: "image";
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  tint: string;
  position?: string;
};

export const projects: Project[] = [
  {
    slug: "paddlelab-xr",
    blurb: "table tennis in webxr, on its own physics engine",
    cover: { kind: "image", src: "/work/paddlelab-drill.jpg", alt: "PaddleLab XR in a topspin drive drill, with the ball machine, table, and live coaching panel", fit: "cover", tint: "#1b1b1d" },
    images: [
      { src: "/work/paddlelab-title.jpg", alt: "PaddleLab XR title screen with the game menu: tournament, play a friend, bots, drills, coach", caption: "the menu. tournaments, online versus, bots, drills, and coach mode." },
      { src: "/work/paddlelab-drill.jpg", alt: "PaddleLab XR in a topspin drive drill, with the ball machine, table, and live coaching panel", caption: "a topspin drive drill against the ball machine, with the live coaching panel up top right. this is the desktop mouse mode; on a quest it's the same scene in the headset." },
    ],
    featured: true,
    id: "02",
    title: "PaddleLab XR",
    shortDescription:
      "Browser-based WebXR table tennis trainer with a custom spin-aware physics engine, AI coaching, and real-time multiplayer. Built at Hack the North 2026.",
    tags: ["WebXR", "Three.js", "Physics", "Hackathon"],
    period: "Sep 2026",
    overview:
      "PaddleLab XR is a table tennis training and competitive platform that runs entirely in the browser through WebXR, with no native app or sideloading required. Built at Hack the North 2026, it combines arcade drills, a scored coaching mode, and head-to-head versus play, and works on a Meta Quest 3S as well as on desktop, webcam, and phone.",
    highlights: [
      "Wrote a lightweight custom physics engine with quadratic drag, Magnus force, spin-aware bounces, and swept collision detection using a regulation 2.7 g ball",
      "Abstracted every input method (Quest controllers, hand tracking, mouse, MediaPipe webcam tracking, ArUco-marked physical paddles, and phone orientation) into a single unified paddle so physics, rendering, and scoring stay input-agnostic",
      "Designed a one-simulation, one-host multiplayer model where the host runs physics and streams ball state at 30 Hz over LAN relay, Supabase Realtime, or BroadcastChannel",
      "Built seven arcade drills plus a coach mode with scored stroke guidance, haptics, per-shot AI feedback, post-match analysis, and voice narration",
    ],
    techStack: [
      "Three.js",
      "WebXR",
      "Vite",
      "MediaPipe",
      "ArUco",
      "Supabase Realtime",
      "Web Audio API",
    ],
    metrics: [
      { label: "Platform", value: "WebXR" },
      { label: "Net Sync", value: "30 Hz" },
      { label: "Drills", value: "7" },
      { label: "Event", value: "HTN 2026" },
    ],
    writeup: [
      "an AR/VR table tennis coach built at Hack the North 2026. it runs straight in the browser through WebXR, so on a Meta Quest 3S you just open the url and you're at the table. no app store, no sideloading.",
      "the ball runs on a small custom physics engine rather than an off-the-shelf one. it's a regulation 2.7 g ball with quadratic drag, Magnus force so topspin dips and backspin floats, spin-aware bounces off the table and paddle, and swept collision detection so a fast swing can't tunnel straight through the ball between frames.",
      "every way of holding a paddle feeds the same paddle object: Quest controllers, Quest hand tracking, mouse and keyboard, webcam hand tracking through MediaPipe, a real paddle with printed ArUco markers on it, or a phone used as the paddle with its orientation sensors and haptics. physics, rendering, and scoring never know which one you're using.",
      "versus mode is one simulation, one host. the hosting device runs the physics and streams the ball at 30 Hz, and the other player only sends their paddle back. that keeps latency-sensitive round trips out of the rally. it syncs over a LAN relay, Supabase Realtime, or BroadcastChannel for two windows on the same machine, with room codes to join.",
      "on top of that there are seven arcade drills (topspin drive, backspin push, flat block, sidespin mix, an infinite ball machine, target practice, and a rally against an AI), and a coach mode that scores your serves, drives, pushes, and blocks, gives per-shot feedback, writes a post-match breakdown, and reads it out loud.",
    ],
    link: { label: "paddlelab-xr.vercel.app", href: "https://paddlelab-xr.vercel.app" },
  },
  {
    slug: "unstable-daw",
    blurb: "hum a melody, get a backing band",
    cover: { kind: "image", src: "/work/unstable-daw-instruments.jpg", alt: "Unstable DAW instruments page: describe an instrument, or load one from the library", fit: "cover", position: "left top", tint: "#ffffff" },
    images: [
      { src: "/work/unstable-daw-studio.png", alt: "Unstable DAW studio view with a hummed melody converted to a MIDI clip on the timeline", caption: "the studio. a hummed melody, already turned into a midi clip on the timeline, with the arrangement prompt at the bottom." },
      { src: "/work/unstable-daw-instruments.jpg", alt: "Unstable DAW instruments page: describe an instrument, or load one from the library", caption: "instruments. name a real one and it plays through a sample library, or describe something stranger and stable audio invents it." },
    ],
    featured: true,
    id: "03",
    title: "Unstable DAW",
    shortDescription:
      "AI-native browser DAW that turns a hummed melody into editable MIDI and generates a backing band with Stable Audio. Built at Music Tech Hackathon Montreal 2026.",
    tags: ["Python", "React", "Audio ML", "Hackathon"],
    period: "Aug 2026",
    overview:
      "Unstable DAW is a small music workstation that runs in the browser and uses Stable Audio to fill in the parts you can't play yourself. Hum a tune into your laptop, get it back as notes you can edit, then ask in plain English for a band to play along. Built in a weekend by a team of three at Music Tech Hackathon Montreal for the Stability AI track.",
    highlights: [
      "Built a pitch-to-MIDI pipeline that turns recorded or uploaded vocals into editable notes, with tempo and key detection correct on 18/18 test fixtures",
      "Created a DAW-style studio with a multi-track timeline, piano roll, snap to grid, split, duplicate, undo/redo, and mute/solo",
      "Rendered synthesized guide tracks to steer Stable Audio generation so the output keeps the melody while changing the instrumentation, then time-aligned the results and optionally split them into stems with Demucs",
      "Parsed natural-language arrangement requests like \"bass, drums and piano, bossa nova\" with an LLM, and exported WAV stems, MIDI, and generation metadata",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "Stable Audio",
      "Demucs",
      "Librosa",
    ],
    metrics: [
      { label: "Model", value: "Stable Audio" },
      { label: "Key/Tempo", value: "18/18" },
      { label: "Team Size", value: "3" },
      { label: "Built In", value: "1 weekend" },
    ],
    writeup: [
      "an AI-native DAW built in a weekend at Music Tech Hackathon Montreal (August 22-23, 2026) for the Stability AI track with a team of three. the idea: hum a tune into your laptop, get it back as notes you can edit, then ask for a band to play along.",
      "the front half is pitch-to-MIDI. you record or upload a vocal, it gets analyzed for tempo and key (18/18 correct on both across our test fixtures), pitch-tracked, and turned into MIDI clips that land in a proper studio view: multiple tracks on a timeline, a piano roll, snap to grid, split, duplicate, undo/redo, mute/solo.",
      "the back half is generation. you type something like \"bass, drums and piano, bossa nova\" and an LLM turns that into an arrangement. the trick for keeping your melody intact is a guide track: the MIDI gets rendered to audio first, and Stable Audio transforms that guide instead of generating from nothing, so the tune survives while the instrumentation changes. the output is time-aligned back onto the grid and can be split into stems with Demucs.",
      "you can also map MIDI to sampled real instruments or describe a made-up timbre in text and have it generated. everything exports: WAV stems, MIDI, the original recordings, and the metadata for each generation.",
    ],
    link: { label: "github.com/walkingwave/unstable-daw", href: "https://github.com/walkingwave/unstable-daw" },
  },
  {
    slug: "internoutsider",
    blurb: "an internship board hidden behind a rabbit game",
    cover: { kind: "image", src: "/work/internoutsider-game.jpg", alt: "Rabbit Simulator, the carrot-clicking game that hides the InternOutsider job board", fit: "cover", position: "center 65%", tint: "#8fd0f0" },
    images: [
      { src: "/work/internoutsider-game.jpg", alt: "Rabbit Simulator, the carrot-clicking game that hides the InternOutsider job board", caption: "the front page. it's a game. click the rabbit by the burrow ten times and the board unlocks." },
    ],
    featured: true,
    id: "04",
    title: "InternOutsider",
    shortDescription:
      "internship job board that scrapes 13+ sources and ATS platforms directly, hidden behind a carrot-clicking game so it looks like anything but a job hunt.",
    tags: ["Node.js", "Scraping", "Supabase", "Vercel"],
    period: "2025",
    overview:
      "A live internship dashboard that pulls postings from community feeds, applicant tracking systems, and direct company career sites into one filterable board. Built because the paid alternatives charge for something that is, underneath, a list of public endpoints. Hit 30 users in the first two days.",
    highlights: [
      "Scrapes 13+ sources: Greenhouse, Lever, Workday, Ashby, SmartRecruiters, Oracle Cloud HCM, Workable, plus Amazon and Apple direct",
      "Auto-discovers ATS board tokens out of posting URLs, growing coverage from ~60 hand-added companies to thousands of boards",
      "Rotates deferred boards across runs with carry-forward, so total coverage converges past Vercel's 60 second function limit",
      "Normalizes ATS junk (address-blob locations, ~200 department strings) into readable places and 17 categories",
      "Cover page is a carrot-clicking game; the board only unlocks after ten clicks on the rabbit",
    ],
    techStack: [
      "Node.js",
      "Express",
      "Supabase",
      "Vercel",
      "Playwright",
      "REST APIs",
    ],
    metrics: [
      { label: "Users", value: "30 in 2 days" },
      { label: "Sources", value: "13+" },
      { label: "Refresh", value: "15 min" },
      { label: "Cost", value: "$0" },
    ],
    writeup: [
      "i built this because InternInsider was charging too much for what is, underneath, a list of public endpoints. every ATS a company hires through already serves its own postings over an unauthenticated API. nobody needs to pay a subscription to read them. so i wrote the thing that reads them.",
      "it pulls from 13+ sources. the community-maintained github lists (Simplify, Pitt CSC/Vansh, and a big-tech tracker), Y Combinator's per-company job pages, a16z's portfolio jobs API, and then the applicant tracking systems directly: Greenhouse, Lever, Workday, Ashby, SmartRecruiters, Oracle Cloud HCM, and Workable. Amazon and Apple hire through their own stack rather than an ATS, so those get their own adapters. Google, Microsoft, Tesla and Meta got adapters too, and then got deleted after probing them from the deployment showed every endpoint either 404s, 403s from a datacenter IP, or only loads postings over GraphQL after render.",
      "the interesting part is board discovery. the curated company lists capped coverage at whatever ~60 companies i had added by hand. but every posting the community feeds carry links straight at the company's ATS, and the board identifier is sitting right there in the URL, so the scraper harvests those tokens across seven platforms and then pulls each discovered board in full. a typical run finds ~510 Greenhouse boards, ~1,160 Workday tenant/site pairs, ~270 Ashby, ~170 Lever. a token found this way is verified by construction: it came off a posting a maintained feed is currently serving, so the board exists.",
      "that doesn't fit in Vercel's 60 second function limit, so boards past the per-run cap aren't dropped, they're deferred. each run records where it stopped and the next one resumes there, wrapping around, and jobs found earlier are carried forward until three days after they were last actually seen. Workday's ~1,160 boards take about 14 runs, roughly 3.5 hours at the 15 minute refresh. phase two also runs under a hard wall-clock budget, so a slow ATS degrades to partial coverage that the next run heals, instead of Vercel killing the function and losing the whole snapshot.",
      "there's no cron either. Vercel Hobby only allows daily crons, so instead /api/jobs checks the cached snapshot's age on every request: older than 15 minutes and that one request pays the ~15-20s re-scrape, everyone after it gets the fresh cache instantly. scraping only happens when someone's actually using the site.",
      "each ATS stores whatever its customer typed, so normalizing is its own problem. RTX's Workday board hands over locations like `CA-ON-OAKVILLE-1400 ~ 1400 S Service Rd W`, which is unreadable and also breaks country detection, so Workday's country-region-city blocks get unpacked and street addresses dropped. the category facet had ~200 entries because every department string went through verbatim (`806-G&A ES Corp`, `Botnet`, `ZURU Toys`), so titles are now classified into 17 buckets with the more specific one winning ties. 2 of 1,607 jobs end up in \"Other\".",
      "and then the part i actually enjoyed building: the site's front page isn't the job board. it's Rabbit Simulator, a carrot-clicking game. the board lives at /board and a glance at the tab, or at the screen over your shoulder at work, shows a game. click the rabbit by the burrow ten times and it unlocks; Shift+Escape anywhere on the board re-locks it and drops you back into the game. shift is required so it can't fire while you're closing a dialog with plain escape. the routing carries it too, `public/index.html` is the game and `public/board.html` is the board, so the game is just the directory index with no rewrite involved.",
      "worth being honest about: that's a privacy screen, not access control. it keeps the board off the screen of anyone who glances at it. it does nothing against anyone who opens devtools or hits /api/jobs directly.",
    ],
  },
  {
    slug: "riscfx",
    blurb: "real-time guitar effects on risc-v",
    cover: { kind: "image", src: "/work/riscfx-diagram.png", alt: "riscFX system block diagram", fit: "contain", tint: "#ffffff" },
    id: "05",
    title: "riscFX",
    shortDescription:
      "Real-time guitar FX processor in C & RISC-V assembly with DSP algorithms, FIFO buffering, and VGA/PS/2 control interface.",
    tags: ["RISC-V", "C", "DSP", "VGA"],
    period: "Mar 2025 – May 2025",
    overview:
      "Designed and prototyped a real-time guitar effects processor targeting RISC-V hardware, capable of applying five studio-quality effects (reverb, delay, wah, overdrive, and mute) with near-zero-latency line-level processing for live performance.",
    highlights: [
      "Implemented DSP algorithms for 5 effects with <5 ms latency at 44.1 kHz, 16-bit fidelity",
      "Developed FIFO buffering and DSP-based filtering, minimizing signal noise by >90%",
      "Built a VGA visual interface and PS/2 keyboard control system for real-time parameter adjustment and effect state display",
      "Ensured seamless line-level processing suitable for live guitar performance",
    ],
    techStack: ["C", "RISC-V Assembly", "DSP", "FIFO Buffering", "VGA", "PS/2"],
    metrics: [
      { label: "Latency", value: "<5 ms" },
      { label: "Sample Rate", value: "44.1 kHz" },
      { label: "Effects", value: "5" },
      { label: "Noise Reduction", value: ">90%" },
    ],
    writeup: [
      "a real-time guitar effects processor built on the DE1-SoC board. it takes a pre-amplified, line-level signal from an electric guitar and applies real-time digital signal processing to modify the sound.",
      "the signal chain runs the guitar into a pre-amp, then into an analog to digital converter that feeds the DE1-SoC. from there a RISC-V processor manages the audio, moving samples through an input/output buffer and audio sample memory and dispatching them to the signal processing stage.",
      "the signal processing stage implements five effects: reverb, delay, wah, overdrive, and mute. these run across the FPGA fabric and the ARM processor on the DE1-SoC. effects are toggled in real time using the on-board switches, with a PS/2 keyboard and VGA monitor handling control and effect state display.",
      "the processed samples are converted back to analog through a digital to analog converter and sent to a speaker or guitar amplifier, so the effect is heard the instant you play. the DSP runs at a 44.1 kHz sample rate with under 5 ms of latency, and FIFO buffering combined with DSP filtering keeps signal noise down by over 90 percent.",
    ],
    images: [
      {
        src: "/work/riscfx-diagram.png",
        alt: "System block diagram: guitar input through pre-amp and ADC into the RISC-V processor and DE1-SoC, with reverb, delay, wah, overdrive, and mute effects, out through a DAC to a speaker",
        caption:
          "system block diagram. guitar in through the pre-amp and ADC, DSP effects on the RISC-V processor and DE1-SoC, then back out through the DAC to a speaker or amp.",
      },
    ],
  },
  {
    slug: "tx-power-amplifier",
    blurb: "a 7 w class-e amplifier for a software radio",
    cover: { kind: "image", src: "/work/tx-pcb-render.png", alt: "3D render of the TX power amplifier PCB", fit: "cover", tint: "#0e1a12" },
    id: "06",
    title: "TX Power Amplifier & Filter",
    shortDescription:
      "Class-E power amplifier with 3-stage low-pass filter for software-defined radio (~7 W at 14 MHz, THD < 10%).",
    tags: ["RF", "Power Electronics", "SDR", "LTspice"],
    period: "Jan 2025 – May 2025",
    overview:
      "Led a 3-member team to design and prototype a transmission subsystem for a software-defined radio, focusing on signal amplification and filtering to meet real-world communication requirements.",
    highlights: [
      "Designed and tested a Class-E power amplifier with a 3-stage low-pass filter",
      "Achieved ~7 W output power at 14 MHz while maintaining distortion below 10% (THD < 10%)",
      "Delivered presentations, design documentation, and prototypes demonstrating technical trade-offs and system integration",
      "Analyzed schematic performance and optimized component selection for RF transmission",
    ],
    techStack: ["LTspice", "RF Design", "Class-E Amplifier", "Low-Pass Filter", "MATLAB"],
    metrics: [
      { label: "Output Power", value: "~7 W" },
      { label: "Frequency", value: "14 MHz" },
      { label: "THD", value: "<10%" },
      { label: "Team Size", value: "3" },
    ],
    writeup: [
      "this was subsystem F of a software-defined radio: the transmit power amplifier and filter, built by team F10. it sits at the end of the chain, taking a roughly 1 vpp high-frequency signal from the previous subsystem, amplifying it, and filtering it so it's clean enough to drive an antenna.",
      "the requirements set the targets. generate 1 to 10 W into a 50 Ω load at 14 MHz, keep total harmonic distortion under 10 percent, only enable the amplification stage when the active-low /TXEN control line is pulled low, and fit everything inside a 2000 mil by 3550 mil (50.8 mm by 90.2 mm) board.",
      "the topology is a class E power amplifier. an LT1719 comparator (U2) squares the incoming signal, a UCC27424 gate driver (U1) drives an IRF510 MOSFET (Q1), and a multi-stage LC low-pass filter (L1 to L4, C1 to C5) cleans up the output before it reaches the 50 Ω load. i designed the schematic and PCB in Altium and had the board fabricated and soldered.",
      "testing ran in two stages: first the assembled PCB on the bench, then breadboarding the individual stages once the breakout boards were available, so each part could be characterized on its own.",
      "the class E amplifier stage matched its LTspice simulation when driven with the equivalent test input, confirming the amplifier behaves the way it was designed to. on the output side, an FFT of the signal measured a THD of 1.933 percent at the target 14 MHz, comfortably under the 10 percent spec, which shows the low-pass filter is doing its job and attenuating the unwanted harmonics.",
    ],
    images: [
      {
        src: "/work/tx-interface-table.png",
        alt: "Interface table listing the ~1 vpp input signal, the active-low TXEN enable, and the amplified filtered output",
        caption:
          "the subsystem interface. a ~1 vpp signal to amplify, an active-low /TXEN enable line, and an amplified, filtered output that drives the antenna.",
      },
      {
        src: "/work/tx-schematic.png",
        alt: "Altium schematic showing the LT1719 comparator, UCC27424 driver, IRF510 MOSFET, and LC low-pass filter",
        caption:
          "the Altium schematic. LT1719 comparator (U2) into a UCC27424 gate driver (U1) and IRF510 MOSFET (Q1), then the LC low-pass filter.",
      },
      {
        src: "/work/tx-pcb-render.png",
        alt: "3D render of the Altium PCB layout with components labelled",
        caption: "the Altium PCB layout, 3D render.",
      },
      {
        src: "/work/tx-pcb-layout.png",
        alt: "PCB copper and routing view from Altium",
        caption: "the copper and routing in Altium.",
      },
      {
        src: "/work/tx-pcb-soldered.png",
        alt: "Photo of the final soldered PCB with all components populated",
        caption: "the final soldered board with all components populated.",
      },
      {
        src: "/work/tx-test-bench.png",
        alt: "Bench test setup: the board wired in through breadboards and jumpers, probed on a Keysight oscilloscope",
        caption:
          "bench testing the board on the oscilloscope, wired in through breadboards and jumpers.",
      },
    ],
  },
  {
    slug: "piano-synthesizer",
    blurb: "an fpga piano with a 10-second looper",
    cover: { kind: "image", src: "/work/piano-vga-keys.png", alt: "Piano keys rendered on a VGA display", fit: "cover", tint: "#0a0a0a" },
    id: "07",
    title: "Piano Synthesizer & Loop Machine",
    shortDescription:
      "DE1-SoC FPGA digital piano with PS/2 input, real-time audio output, VGA feedback, and 10-second recording/playback.",
    tags: ["Verilog", "FPGA", "DE1-SoC", "VGA"],
    period: "Nov 2024 – Dec 2024",
    overview:
      "Implemented a digital piano synthesizer and loop machine on the DE1-SoC FPGA, converting PS/2 keyboard inputs into real-time audio output with synchronized VGA visual feedback for enhanced playability.",
    highlights: [
      "Designed modular Verilog controllers for input handling, tone generation, VGA display, and recording/playback",
      "Achieved <5 ms audio latency with 100% functional accuracy across 12+ test sessions",
      "Optimized on-chip memory and FPGA architecture for 10-second recording/playback within 50 MHz timing constraints",
      "Built synchronized VGA visual feedback alongside real-time audio synthesis",
    ],
    techStack: ["Verilog", "Quartus Prime", "DE1-SoC", "PS/2", "VGA", "FPGA"],
    metrics: [
      { label: "Latency", value: "<5 ms" },
      { label: "Clock", value: "50 MHz" },
      { label: "Recording", value: "10 sec" },
      { label: "Test Sessions", value: "12+" },
    ],
    writeup: [
      "the goal was to build a musical instrument that converts a user input into an audio tone, modelled on a traditional piano. it has 13 unique tones mapped to 13 unique inputs.",
      "input is captured from a PS/2 keyboard, which passes through a PS/2 controller into the DE1-SoC board. the piano logic runs on the board and drives two outputs at once: a VGA display for visual feedback, generated from ROM through a VGA adapter and a digital to analog converter, and a set of stereo speakers through the audio controller and audio codec.",
      "the tones are synthesized additively. every active input, whether it is live PS/2 input or a stored input read back from memory, is summed, fed into a square wave generator, and the resulting square waves are summed together. that combined waveform is then scaled into a final wave and passed to the audio controller and codec for playback.",
      "on top of live playing, the synthesizer records up to 10 seconds of user input. a recording button (O) writes the PS/2 input into RAM, and a playback button (P) reads the stored input back out of RAM into the DE1-SoC so it can be replayed at will. the capture lives in the board's on-chip memory, and the pipeline is designed to run with under 5 ms of audio latency inside the 50 MHz timing constraints.",
      "in the future it could take an external MIDI keyboard controller in place of the PS/2 keyboard. the plan would be to use a microcontroller such as an arduino to receive MIDI input and convert it into a bitwise code or PS/2 signal that the FPGA can read.",
    ],
    images: [
      {
        src: "/work/piano-vga-keys.png",
        alt: "Piano keys rendered on a VGA display with several keys highlighted in cyan",
        caption:
          "the piano rendered on a VGA display. active keys light up as you play them.",
      },
      {
        src: "/work/piano-setup.png",
        alt: "The physical setup: DE1-SoC board, PS/2 keyboard, and stereo speakers on a desk",
        caption:
          "the full setup: DE1-SoC board, PS/2 keyboard, and a pair of stereo speakers.",
      },
      {
        src: "/work/piano-system-diagram.png",
        alt: "System block diagram from PS/2 keyboard through the DE1-SoC to VGA and audio output",
        caption:
          "system block diagram. PS/2 input runs through the PS/2 controller and DE1-SoC out to the VGA display and the audio codec.",
      },
      {
        src: "/work/piano-audio-diagram.png",
        alt: "Audio path diagram: inputs summed, square-wave generated, combined, scaled to the final wave",
        caption:
          "the audio path. live and stored inputs are summed, run through a square wave generator, summed again, then scaled into the final wave.",
      },
      {
        src: "/work/piano-record-playback.png",
        alt: "Record and playback flow diagram showing input written to RAM and read back on playback",
        caption:
          "record and playback. the recording button writes PS/2 input into RAM, and the playback button reads it back into the DE1-SoC.",
      },
    ],
  },
  {
    slug: "autonomous-sumo-robot",
    blurb: "a robot that shoves other robots out of a ring",
    cover: { kind: "image", src: "/work/sumo-robot.png", alt: "The autonomous sumo robot up close", fit: "cover", tint: "#e9e6e1" },
    id: "08",
    title: "Autonomous Sumo Robot",
    shortDescription:
      "Team-led autonomous sumo robot with SolidWorks mechanical design, C/C++ navigation stack, and closed-loop ultrasonic and line-sensor feedback.",
    tags: ["C/C++", "SolidWorks", "Embedded", "Robotics"],
    period: "Sep 2023 – Apr 2024",
    overview:
      "Directed the design and fabrication of an autonomous sumo robot for UTRA competition, managing the integration of mechanical chassis constraints with embedded software requirements from concept through arena combat.",
    highlights: [
      "Directed the design and fabrication of an autonomous sumo robot, managing the integration of mechanical chassis constraints with embedded software requirements",
      "Programmed the navigation stack in C/C++, utilizing differential drive algorithms to govern motor speed and torque for precise maneuvering",
      "Implemented closed-loop sensor feedback, processing ultrasonic and line-sensor data to maintain stability and prevent arena boundary exits during combat",
      "Modeled mechanical components and assembly constraints in SolidWorks to validate chassis geometry before fabrication",
    ],
    techStack: ["Arduino", "C/C++", "SolidWorks", "Ultrasonic Sensors", "Line Sensors", "Differential Drive"],
    metrics: [
      { label: "Role", value: "Team Lead" },
      { label: "Sensors", value: "US + Line" },
      { label: "Drive", value: "Diff." },
      { label: "CAD", value: "SolidWorks" },
    ],
    writeup: [
      "an autonomous sumo robot built for the UTRA competition, where i led the team. the goal is easy to state and hard to pull off: stay inside the ring, find the opposing robot, and shove it out, all on its own with no remote control.",
      "the brains are an arduino running the navigation stack in C/C++. it runs autonomous pathfinding logic to search the arena and drive at the opponent, using a differential drive setup where each wheel's speed and direction is controlled independently for tight, responsive turning.",
      "for sensing it runs closed-loop feedback from an ultrasonic sensor to spot the opponent and line sensors to catch the ring boundary, so it can chase a target down without driving itself out of bounds.",
      "i modelled the chassis and mechanical parts in solidworks, checking the geometry and assembly constraints before fabricating so the electronics and drivetrain actually fit the body.",
    ],
    images: [
      {
        src: "/work/sumo-robot.png",
        alt: "Close-up of the sumo robot with an ultrasonic sensor on the front and an Arduino with wiring stacked on top",
        caption:
          "the robot up close. an ultrasonic sensor on the front for spotting the opponent, with the arduino and wiring stacked on top.",
      },
      {
        src: "/work/sumo-team.png",
        alt: "The project team at the competition",
        caption: "the team at the competition.",
      },
    ],
  },
  {
    slug: "instrument-technique-classifier",
    blurb: "a cnn that hears how a note was played",
    cover: { kind: "image", src: "/work/aps360-mel-examples.png", alt: "Mel-spectrograms of legato, normal and staccato flamenco guitar", fit: "contain", tint: "#ffffff" },
    featured: true,
    id: "09",
    title: "Multi-Instrument Articulation Classifier",
    shortDescription:
      "a cnn that listens to a phrase and says how it was played (normal, legato or staccato) across five instruments. also a lesson in how eagerly a model will cheat if you let it.",
    tags: ["PyTorch", "CNN", "Audio ML", "librosa"],
    period: "2025",
    overview:
      "A two-head convolutional network that maps raw audio to the playing technique used to produce it (normal, legato, or staccato) across five virtual instruments, labelling a whole phrase rather than a single note. Held-out takes reach 0.913 articulation accuracy and every one of 15 held-out phrases is classified correctly; an entire unseen instrument still reaches 0.640 against 0.33 chance.",
    highlights: [
      "Generated the dataset from scratch: 165 procedural MIDI takes rendered through multi-sampled VSTs in Ableton, cut into 9,286 mel-spectrogram windows",
      "Two output heads (5 instruments, 3 articulations) over a 33,160-parameter CNN with global pooling across both time and frequency",
      "Caught and fixed a data-leakage bug that had produced a false 100% test accuracy; take-level splits gave a real 0.913",
      "Evaluated across five tiers of increasing distribution shift, including a completely held-out instrument at 0.640 against 0.33 chance",
      "Beat an RBF-SVM baseline on identical splits by 0.110, which isolates what the temporal information is actually worth",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "librosa",
      "NumPy",
      "scikit-learn",
      "Ableton Live 12",
      "SpecAugment",
    ],
    metrics: [
      { label: "Held-out takes", value: "0.913" },
      { label: "Phrases", value: "15/15" },
      { label: "Unseen instrument", value: "0.640" },
      { label: "Parameters", value: "33,160" },
    ],
    link: {
      label: "github.com/walkingwave/APS360-fp",
      href: "https://github.com/walkingwave/APS360-fp",
    },
    writeup: [
      "a cnn that takes raw audio and says how it was played, not what played it. three articulations (normal, legato, staccato) across five virtual instruments (guitar, muted guitar, flamenco guitar, trumpet, piano), labelled a phrase at a time. the applications are practice feedback and expressive transcription, and both of them need to know how a note was produced. most music information retrieval stops at the instrument.",
      "that turns out to be a much harder question than the one instrument-id networks answer. instrument identity sits in a stable spectral envelope, which is why cnns handle it routinely on datasets like irmas. articulation is a property of how energy changes inside a note, and it has to survive timbres that differ from each other far more than the articulations do. attack sharpness, damping, sustain texture: fixed acoustic thresholds separate those badly, which is exactly the case where a network earns its keep.",
      "no dataset existed for it, so i built one. procedural midi phrases, 30 seconds each, varying in pitch set, note rate, rhythm, key and velocity range, rendered in ableton live 12 through multi-sampled vst instruments, one mono wav per take. every render is named instrument__articulation__kind__takeNN, and the take is the unit of independence: that naming convention is the thing that makes the evaluation honest later. 120 phrase takes plus 45 isolated-note takes, the latter held out entirely as a separate test domain. all five instruments play all three articulations, which is what makes an unseen-instrument test possible.",
      "preprocessing is deliberately boring so it stays reproducible from the raw renders. load at 22.05 khz mono through librosa, cut into 1 second windows at 50% overlap, drop anything under an rms floor, normalise each window to a fixed rms, then mel: 128 bins, n_fft 2048, hop 512, 44 frames, db against a fixed reference with absolute clipping. the first and second temporal differences get stacked on as extra channels, so each window is 3×128×44. that comes to 9,286 windows (7,019 from phrases, 2,267 from isolated notes) split by whole take, 5 train / 2 validation / 1 test per class.",
      "the network is small on purpose. three 3×3 conv–batchnorm–relu–maxpool stages at 16, 32 and 64 channels, then the feature map is averaged over both time and frequency, which collapses the parameter count. dropout at 0.3, a 64→128 fully connected layer, and two output heads: one over five instruments, one over three articulations. 33,160 parameters in total. splitting the heads lets the instrument head carry the timbre so the articulation head can specialise on temporal cues, and it is what makes the unseen-instrument test possible at all: you can score articulation on a timbre the model has never been trained on.",
      "training is cross entropy on both heads summed, adam at 1e-3 with 1e-4 weight decay, batch size 32, up to 60 epochs, keeping the weights from the best validation epoch (51). augmentation is applied to the spectrogram rather than the waveform: random gain, low-level gaussian jitter, random time shifts, and specaugment. that matters more here than it usually would, because generated audio has almost no natural variation, and no variation is precisely the condition under which a network memorises instead of learning.",
      "the baseline is an rbf-kernel svm over 21 standardised features (mean and standard deviation of rms, spectral centroid and bandwidth, mean rolloff and zero-crossing rate, and 13 mfcc means) on the same windows and the same splits. since articulation is defined by change over time and those features mostly aren't, the gap between the two models is a direct measurement of what the temporal information is worth: 0.913 against 0.803.",
      "the first version of this reported 100% test accuracy, and it was wrong. clips were being split randomly out of continuous ableton renders, so a test clip and its nearest training clip shared instrument patch, room, reverb tail and note grid: mean cosine similarity in mel space of 0.9986. computing spectrograms with ref=np.max compounded it, since every window gets rescaled to its own peak, so a neighbouring note 4× louder drags the whole spectrogram down by about 12 db relative to an isolated one. splitting strictly by take and pinning the reference dropped the number to 0.913 and moved the learned features from grouping by source render to grouping by articulation. that was the real lesson of the project: the model will take the shortcut every single time you leave one lying around.",
      "so the evaluation is built as tiers that get progressively further from the training distribution, and the shape of the decline is the result, not any one number. held-out takes: 0.913. averaged into one label per phrase, which is how you would actually use it: 15 of 15 correct, instrument and articulation both. isolated notes, after training on phrases only: 0.491, where the svm beats the cnn at 0.551. an entire instrument held out and scored on articulation alone: 0.640 against 0.33 chance. background noise added at test time: 0.933 at 40 db snr, 0.600 by 30 db, and chance at 10 db: partly because augmentation acted on spectrograms rather than waveforms so the model never saw acoustic noise, and partly because it leans on the near-silence between notes, which broadband noise fills in.",
      "the isolated-note collapse is the most interesting failure and it is very specific. staccato recall falls from 0.98 on phrases to 0.05 on single notes: 41 correct out of 754. trained on continuous phrases, the model learned staccato as note density and rhythmic silence rather than as an attack shape, so take the neighbouring notes away and there is nothing left for it to look at. legato is the least confident class throughout, with the lowest recall at 0.86, which fits acoustically: legato differs from normal playing only by note overlap, a smaller difference than the silence that marks staccato.",
      "worth stating the limits plainly. everything is generated from professional multi-sampled libraries, so the model has only ever heard pristine, studio-grade equipment, and accuracy dropping to 0.600 at 30 db snr is an early sign of what that costs: a system like this would give better feedback to whoever already owns better gear, and it has never been tested against a real player at all. the next steps are real recordings and a lot more single-note data, so it has to learn attack transients instead of gaps.",
    ],
    images: [
      {
        src: "/work/aps360-mel-examples.png",
        alt: "Three mel-spectrograms of flamenco guitar showing legato, normal, and staccato articulations of the same instrument",
        caption:
          "one second of flamenco guitar, three articulations. staccato is obvious: the energy dies a third of the way in. legato and normal differ only in how much the notes overlap, which is why legato is the class the model is least sure about.",
      },
      {
        src: "/work/aps360-tiers.png",
        alt: "Line chart of articulation accuracy across test tiers T0 to T4 for the CNN and the SVM baseline, against a 0.33 chance line",
        caption:
          "the whole result in one chart. t0 is the leaky split that started at 100%, t1 is honest held-out takes, t2 averages those into phrases, t3 is isolated notes (where the svm wins), t4 is an instrument the model has never heard.",
      },
      {
        src: "/work/aps360-phrase-timeline.png",
        alt: "A held-out flamenco guitar phrase: waveform on top, per-window class probabilities below, predicted legato at 0.93",
        caption:
          "how a phrase gets labelled. each window votes, the votes get averaged. the wobble around 23 seconds is a window straddling a rest: a window catching only a note tail looks much the same however the note started.",
      },
      {
        src: "/work/aps360-tsne.png",
        alt: "t-SNE projection of the learned features, coloured by articulation on the left and by source take on the right",
        caption:
          "the learned features, projected with t-sne. the earlier leaky model organised itself by which render a clip came from; after take-level splits the clusters line up with articulation instead.",
      },
      {
        src: "/work/aps360-confusion-notes.png",
        alt: "Confusion matrix on isolated notes showing staccato correctly identified only 41 times out of 754",
        caption:
          "where it falls apart. on isolated notes staccato is caught 41 times out of 754, because the model learned staccato as rhythmic silence between notes rather than as the shape of the attack.",
      },
    ],
  },
  {
    slug: "imu-air-drumming-kit",
    blurb: "drums you play in the air",
    cover: { kind: "image", src: "/work/imu-setup.png", alt: "Drumsticks with IMUs wired to an STM32", fit: "cover", tint: "#1a1a1a" },
    id: "10",
    title: "IMU Air-Drumming Kit",
    shortDescription:
      "STM32-based air-drumming system with dual BNO055 IMUs over I2C, maps drumstick motion to three strike zones and triggers real-time percussion audio.",
    tags: ["STM32", "I2C", "IMU", "Embedded"],
    period: "2025",
    overview:
      "The final system is an IMU-based air-drumming kit designed to translate physical gestures into real-time percussion audio. The hardware is built around an STM32 microcontroller which interfaces with two BNO055 IMU sensors via I2C to capture acceleration and orientation data. The sensor data is then processed to establish a 3D coordinate system that maps the drumstick positions to three distinct zones. When a drumstick strike is detected in a zone, the corresponding drum sample is sent to a PAM8302 amplifier and speaker.",
    highlights: [
      "Interfaced two BNO055 9-DOF IMU sensors with an STM32 over I2C to capture acceleration and orientation in real time",
      "Built a 3D coordinate mapping pipeline that assigns each drumstick to one of three distinct strike zones",
      "Implemented strike detection logic to trigger zone-specific percussion samples with low perceived latency",
      "Drove audio output through a PAM8302 amplifier to a speaker for standalone, real-time playback",
    ],
    techStack: [
      "STM32",
      "BNO055",
      "I2C",
      "C/C++",
      "PAM8302",
      "Embedded Audio",
    ],
    metrics: [
      { label: "IMUs", value: "2× BNO055" },
      { label: "Bus", value: "I2C" },
      { label: "Zones", value: "3" },
      { label: "Output", value: "PAM8302" },
    ],
    diagram: {
      src: "/work/imu-air-drumming-diagram.png",
      alt: "IMU air-drumming system block diagram: IMU to STM32 via I2C, through gesture logic, tone generation, and DAC to amplifier and speaker",
    },
    writeup: [
      "an IMU-based air-drumming kit that turns physical gestures into real-time percussion audio. there are no pads or triggers: you hold a pair of drumsticks with sensors on them, swing at empty air, and the right drum sample plays.",
      "the system is built around an STM32 microcontroller talking to two BNO055 IMUs over I2C. each IMU streams orientation (yaw and pitch) and linear acceleration off a drumstick. from that data the STM32 builds a 3D coordinate system and, using a zero-point center reference, splits the space in front of you into three distinct drum zones. a sharp enough spike in acceleration counts as a strike, and whichever zone the stick is pointing at decides which sample fires.",
      "on a strike, the matching sample is played back by running a DMA transfer straight from flash memory to the STM32's DAC, then out through a PAM8302 amplifier to a speaker. the samples were downsampled to 8 kHz 8-bit to fit inside the chip's 512 KB of flash, which puts the audio throughput at 8 kbps.",
      "i wrote the IMU driver from scratch: pinging the sensor to check the connection, initialization, calibration, and reading the orientation and acceleration data. i also handled the hardware integration, the peripheral interfacing, and the audio playback path, configuring the DAC and DMA for low-latency output and tuning the NVIC priorities and DMA config so audio playback and I2C polling could run at the same time. my partner handled the IMU data ingestion and the angle-to-zone mapping, and we both spent a lot of time chasing the IMUs dropping their I2C connection.",
      "the throughput analysis was the interesting part. the BNO055's sensor fusion caps out at 100 Hz, the I2C bus was left in standard mode at 100 kHz (roughly 1.5 ms per sensor, with the blocking HAL read adding more on top), but the real bottleneck was a UART debug string that stalled the CPU for around 7 ms every loop and dragged the rate down to about 140 Hz. dropping those debug transmissions for the final build was the single biggest speedup, since you don't need a printout of which drum was hit once the audio is actually playing.",
      "the main thing i'd change next time is adding a second sensor, like an ultrasonic transducer or a small camera, to back up the IMU. leaning on a zero-point meant that any sensor drift or change in how you held the sticks needed frequent recalibration. an absolute reference would let the drum zones stay put on their own, without the constant software recalibration.",
    ],
    images: [
      {
        src: "/work/imu-setup.png",
        alt: "Holding two drumsticks with BNO055 IMUs mounted on them, wired back to an STM32 on a breadboard in the lab",
        caption:
          "the kit in the lab. two drumsticks with BNO055 IMUs mounted on the tips, wired back to the STM32 on the breadboard.",
      },
      {
        src: "/work/imu-air-drumming-diagram.png",
        alt: "IMU air-drumming system block diagram: IMU to STM32 via I2C, through gesture logic, tone generation, and DAC to amplifier and speaker",
        caption:
          "the project block diagram. the IMUs feed the STM32 over I2C, the gesture logic picks the drum, and the sample plays out through the DAC and amplifier to the speaker.",
      },
    ],
  },
  {
    slug: "soap-alarm",
    blurb: "an alarm for people who don't wash long enough",
    cover: { kind: "image", src: "/work/soap-alarm.png", alt: "The soap alarm box with an LCD reading Good Job", fit: "cover", tint: "#e8efe6" },
    id: "11",
    title: "Soap Alarm",
    shortDescription:
      "makeUofT 2024 hackathon build. an Arduino-based alarm that times how long you hold the bar of soap and goes off if you don't wash long enough.",
    tags: ["Arduino", "Embedded", "Hackathon", "C/C++"],
    period: "makeUofT 2024",
    overview:
      "A hackathon build for makeUofT 2024 that detects when a person does not wash their hands for long enough (looking at you, engineers). It times the interval between when the bar of soap is picked up and when it is put back down, and sounds an alarm if that interval is shorter than the required amount.",
    highlights: [
      "Timed the interval between the soap being picked up and put back down to measure wash duration",
      "Triggered an alarm whenever the wash time fell below the 10-second threshold",
      "Drove a live LCD readout for status and feedback (\"Good Job!\" vs. \"On Standby...\")",
      "Prototyped and demoed end-to-end within a single hackathon weekend",
    ],
    techStack: ["Arduino", "C/C++", "Force Sensor", "LCD", "Buzzer"],
    metrics: [
      { label: "Event", value: "makeUofT 2024" },
      { label: "Threshold", value: "10 sec" },
      { label: "Platform", value: "Arduino" },
      { label: "Output", value: "LCD + Alarm" },
    ],
    writeup: [
      "a makeUofT 2024 hackathon project. the idea is simple and a little bit petty: detect when someone doesn't wash their hands for long enough. looking at you, engineers.",
      "the whole thing runs on an arduino. it tracks the time between when the bar of soap is picked up and when it's put back down, which is a decent proxy for how long you actually scrubbed. a sensor under the soap detects when it leaves and returns, and the arduino times the gap in between.",
      "if the time spent is less than the required amount (10 seconds), an alarm goes off. an LCD gives live feedback on the front of the box, sitting on standby until you use the soap and flashing a verdict once you put it back, \"Good Job!\" if you washed long enough, or the alarm if you cut it short.",
    ],
    images: [
      {
        src: "/work/soap-alarm.png",
        alt: "The finished soap alarm: a cardboard box with a bar of green soap on top and an LCD on the front reading 'Good Job! On Standby...'",
        caption:
          "the finished build. bar of soap on top, LCD on the front showing the status: \"Good Job! On Standby...\"",
      },
      {
        src: "/work/soap-alarm-internals.png",
        alt: "Inside the soap alarm: an Arduino with a breadboard, wiring, and a green LCD module taped onto a cardboard base",
        caption:
          "the internals. the arduino, wiring, and LCD before everything got boxed up.",
      },
    ],
  },
  {
    slug: "soilbot",
    blurb: "tells you when your plant is thirsty",
    cover: { kind: "image", src: "/work/soil-sensor.png", alt: "The Soilbot moisture sensor build", fit: "cover", tint: "#efe9df" },
    id: "12",
    title: "Soilbot",
    shortDescription:
      "UTRAHacks 2023 hackathon build. an Arduino soil moisture sensor that tracks a plant's watering status and shows it live on an LCD.",
    tags: ["Arduino", "Embedded", "Hackathon", "Sensors"],
    period: "UTRAHacks 2023",
    overview:
      "A hackathon build for UTRAHacks 2023 that uses a soil moisture sensor to track a plant's watering status. An Arduino reads the moisture level from a probe in the soil and reports whether the plant needs water on a live LCD readout.",
    highlights: [
      "Read soil moisture from a probe with an Arduino to gauge how wet the soil is",
      "Translated raw sensor readings into a simple plant watering status",
      "Displayed the status live on an LCD readout",
      "Prototyped and demoed end-to-end within a single hackathon weekend",
    ],
    techStack: ["Arduino", "C/C++", "Soil Moisture Sensor", "LCD"],
    metrics: [
      { label: "Event", value: "UTRAHacks 2023" },
      { label: "Platform", value: "Arduino" },
      { label: "Sensor", value: "Soil Moisture" },
      { label: "Output", value: "LCD" },
    ],
    writeup: [
      "a UTRAHacks 2023 hackathon project: a soil moisture sensor that tracks a plant's watering status.",
      "the whole thing runs on an arduino. a moisture probe sits in the soil and the arduino reads how wet it is, then turns that reading into a simple watering status so you know at a glance whether the plant needs water.",
      "an LCD on the front gives the live readout, so instead of guessing or poking the dirt with a finger you just look at the screen.",
    ],
    images: [
      {
        src: "/work/soil-sensor.png",
        alt: "The soil moisture sensor build: an LCD reading 'Repotted Moisture Sensor' mounted on a cardboard box, with a soil moisture probe beside it",
        caption:
          "the build. LCD readout on the front and the soil moisture probe off to the side.",
      },
      {
        src: "/work/soil-sensor-internals.png",
        alt: "Inside the box: an Arduino and breadboard with a tangle of jumper wires",
        caption: "the internals. arduino, breadboard, and a healthy tangle of jumper wires.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
