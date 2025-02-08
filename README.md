# Project Machu Picchu-*Wonderful Life*
## Executive Summary

*Wonderful Life* is an entry to the 2025 hackathon ETH Global *Agentic Ethereum*. It is a rough sketch that shows an agent acting as **International Helper Organization** that receives profiles of **Persons in need**, makes embeddings of these profiles and stores the profile in IPFS, as well as the embedding vector. Both IPFS hashes are stored in the blockchain for notarial purposes and for other Inclusive Finance purposes. Another agent, or the same agent, is used to match the purposes of a Humanitarian Helper Project Sheet with potential candidates to be helped.

The complete scenario of this demo is told in a DeepSeek chatbot session https://github.com/kvutien/Doc-Simulated_profiles_Persons_in_Need/blob/main/Profile_prompt.md

*Wonderful Life* is a sub-project of *Machu Picchu*, an open-source collaborative humanitarian project. *Wonderful Life* simulates how persons in need of similar profiles can help themselves mutually. In this demo, we still use an International Helper Organization (World Food Program, UNICEF, BRAC etc.). The full process, involving blockchain collecting safety net common pool and distributing in case of hardship, is too complex for the scope of a hackathon.

**Machu Picchu is collaborative open-source. Software Contributions from hackers worldwide to enrich Machu Picchu toolsets are heartily welcome.**


## Larger context
- Machu Picchu's White paper is here: https://github.com/kvutien/Project-Machu_Picchu_White_Paper_2024
- Machu Picchu is explained in this 10 minutes video podcast: https://youtu.be/z1ylfi60ES0

As compared to the 10' video, *Wonderful Life* differs because it is of a hackathon illustration scale. In the video there are 4 actors:
- The donors (you and I, governmental budget, UN budget)
- The international helper organizations (Oxfam, UNICEF, WFP etc.)
- The local organizations with field helpers
- The persons in need

*Wonderful Life* only has 2 actors, the international helper organization and the person in need.
In the future there are many more functions that are foreseen. Some are:
- Use of **Abstract Accounts** with multign to let the field helper work with the person in need to create and update personal profiles
- Use of blockchain to let the persons in need **monetize** their profile
- Use of **Raspberry Pi** equivalent in villages to act as low-power **IPFS nodes** and SLM **embedding** servers
- Use of The Graph's **subgraphs** to let the international organization retrieve profiles and **compensate** persons in need for their profiles
- Use of Earth Observation satellite images to assess **crop losses**
- Use of DeFi by international helper organizations to do **Cash & Voucher help**
- more...
Machu Picchu is collaborative and open source. Volunteer hackers are welcome.

## Quick Look at *Wonderful Life*
### Overall View

<img width="1283" alt="wonderful_life_overall" src="https://github.com/user-attachments/assets/6dea9f13-b51a-461a-a354-c915f673aef7" />

There are 2 actors in this demo, the Person in Need and the International Helper Organization. Note that in real life and in Machu Picchu there are more actors.
- **Person in Need** submits its profile in free-form text to **International Helper Organization**
- **International Helper Organization** does the embedding, store in IPFS the original profile text and the vector
- When the IPFS CID are received, it stores them on blockchain
- When **International Helper Organization** receives a Program Sheet of a Helper Program, it makes the embedding of it and matches the vector with the closest profiles of Person in Need to entitle them for help.


### State Machine Profile Embedding Agent
<img width="1298" alt="wonderful_life_states1" src="https://github.com/user-attachments/assets/66e108c6-0374-4ce3-83dd-1b62b75028ee" />

### State Machine Profile Matching with Help Program Agent
<img width="1141" alt="wonderful_life_states2" src="https://github.com/user-attachments/assets/35b909bc-2ef4-4b66-a579-7eb1fdf7b738" />


## Bonus: origin of the names *Machu Picchu* and *Wonderful Life*
- *Machu Picchu*, an Inca citadel built in the 15th century, is nestled high in the Andes Mountains of Peru. It was brought to wider attention in 1911 by Hiram Bingham. Its construction is remarkable for its sophisticated dry-stone walls, which fit together perfectly without mortar. **Huge blocks carefully crafted to make a still bigger citadel**.
- *It's a Wonderful Life* is a 1946 Christmas fantasy drama film produced and directed by Frank Capra, starring James Stewart as George Bailey, a man who has given up his personal dreams in order to **help others in his community**. His thoughts of suicide on Christmas Eve bring about the intervention of his guardian angel, Clarence Odbody. Clarence shows George all the lives he touched and what the world would be like, if he had never existed

## How to install and run *Wonderful Life*

You can access the live demo at: [Wonderful Life Demo](https://project-wonderful-life-mac-git-70700e-rushikeshnimkars-projects.vercel.app/dashboard)

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git
- A modern web browser
- Code editor (VS Code recommended)

### Environment Variables
Create a `.env` file in the root directory with the following variables:

## How to install and run *Wonderful Life*

You can access the live demo at: [Wonderful Life Demo](https://project-wonderful-life-mac-git-70700e-rushikeshnimkars-projects.vercel.app/dashboard)

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git
- A modern web browser
- Code editor (VS Code recommended)

### Environment Variables
Create a `.env` file in the root directory with the following variables:

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/kvutien/Project-Wonderful_Life-Machu_Picchu.git
cd Project-Wonderful_Life-Machu_Picchu```
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.sample .env
```

Edit .env file with your API keys

4. Run the development server

```bash
pnpm dev
```

5. Open your browser and navigate to

**http://localhost:3000**

### Build for Production

```bash
pnpm build
pnpm start
```


### Troubleshooting
- If you encounter any issues with dependencies, try removing `node_modules` and `pnpm-lock.yaml`:

bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install


- Ensure all environment variables are properly set
- Check Node.js version compatibility
- Make sure ports 3000 is not in use by other applications

For more information about the project, please refer to the [White Paper](https://github.com/kvutien/Project-Machu_Picchu_White_Paper_2024).