# Project Machu Picchu-*Wonderful Life*
## Executive Summary
*Wonderful Life* is a sub-project of *Machu Picchu*, an open-source collaborative humanitarian project. *Wonderful Life* simulates how persons in need of similar profiles can help themselves mutually. In this demo, we still use an International Helper Organisa--zation (World Food Program, UNICEF, BRAC etc.). The full process, involving blockchain collecting safety net common pool and distributing in case of hardship, is too complex for the scope of a hackathon.

**Future Software Contributions from hackers worldwide to Machu Picchu are heartily welcome.**

*Wonderful Life* is an entry to the 2025 hackathon ETH Global *Agentic Ethereum*. It is a rough sketch that shows an agent that receive profiles of **Persons in need**, make embeddings of these profiles and stores the profile in IPFS, as well as the embedding vector. Both IPFS hashes are stored in the blockchain for notarial purposes and for other Inclusive Finance purposes. Another agent, or the same agent, is used to match the purposes of a Humanitarian Helper Project Sheet with potential candidates to be helped.

The complete scenario is told in a DeepSeek chatbot session https://github.com/kvutien/Doc-Simulated_profiles_Persons_in_Need/blob/main/Profile_prompt.md

- Machu Picchu's White paper is here: https://github.com/kvutien/Project-Machu_Picchu_White_Paper_2024
- Machu Picchu is explained in this 10 minutes video podcast: https://youtu.be/z1ylfi60ES0

## Quick Look at *Wonderful Life*
### Overall View
![Overall View](./images/wonderful_life_overall.png)

There are 2 actors in this demo, the Person in Need and the International Helper Organization. Note that in real life and in Machu Picchu there are more actors.
- **Person in Need** submits its profile in free text to **International Helper Organization**
- **International Helper Organization** does the embedding, store i-on IPFS the original profiel text and the vector
- When the IPFS CID are received, it stores them on blockchain
- When **International Helper Organization** receives a Program Sheet of a helper Program, it makes the embedding of it and matches the vector with the closest profiles of Person in Need.


### State Machine Profile Embedding Agent
![Embedding State Machine](./images/wonderful_life_states1.png)
### State Machine Profile Matching with Help Program Agent
![matching State Machine](./images/wonderful_life_states2.png)

## Bonus: origin of the names *Machu Picchu* and *Wonderful Life*
- *Machu Picchu*, an Inca citadel built in the 15th century, is nestled high in the Andes Mountains of Peru. It was brought to wider attention in 1911 by Hiram Bingham. Its construction is remarkable for its sophisticated dry-stone walls, which fit together perfectly without mortar. **Huge blocks carefully crafted to make a still bigger citadel**.
- *It's a Wonderful Life* is a 1946 Christmas fantasy drama film produced and directed by Frank Capra, starring James Stewart as George Bailey, a man who has given up his personal dreams in order to **help others in his community**. His thoughts of suicide on Christmas Eve bring about the intervention of his guardian angel, Clarence Odbody. Clarence shows George all the lives he touched and what the world would be like, if he had never existed

## How to install and run *Wonderful Life*
To be done