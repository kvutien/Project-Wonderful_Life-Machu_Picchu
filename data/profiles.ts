import { Profile } from '@/types/profile'
import { createProgramEmbedding } from '@/utils/vectorutils'
import { storeProfileWithEmbedding } from '@/utils/ipfsUtils'
import { addHash } from '@/app/api/profiles/hashes/route'


// Function to process and store a profile
export async function addProfile(profileData: string) {
  try {
    // Create embedding for the profile text
    const embedding = await createProgramEmbedding(profileData)
    
    // Generate a unique ID
    const id = crypto.randomUUID()
    
    // Create a profile object with the raw text
    const profile: Profile = {
      id,
      rawData: profileData,
      ipfsHash: '', // Will be updated after storage
      createdAt: new Date().toISOString(),
      name: '',
      skills: [],
      experience: '',
      location: '',
      bio: '',
      education: '',
      languages: [],
      availability: '',
      contactInfo: {
        email: '',
        phone: undefined
      }
    }
    
    // Store profile and embedding in IPFS
    const ipfsHash = await storeProfileWithEmbedding(profile, embedding)
    
    // Update profile with IPFS hash
    profile.ipfsHash = ipfsHash
    
    // Add hash to tracked hashes
    addHash(ipfsHash)
    
    return profile
  } catch (error) {
    console.error('Error processing profile:', error)
    throw error
  }
}

// Example usage for the profiles data
const profiles = [
  `- Profile 1: Amina Diallo
- Name: Amina Diallo
- Age: 34
- Gender: Female
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly parent)
- Location: Zinder Region
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has a chronic respiratory condition
- Access to Healthcare: Limited; nearest clinic is 15 km away
- Education Level: Primary education (completed)
- Employment Status: Farmer and livestock keeper
- Income Level: Approximately $200 per year
- Housing Conditions: Traditional mud-brick house with thatched roof
- Food Security: Occasionally faces food shortages during the dry season
- Water and Sanitation Access: Access to a borehole, but water quality is poor
- Social Support Networks: Strong community ties; participates in local women's group
- Coping Mechanisms: Engages in barter trade with neighbors
- Cultural Background: Hausa ethnic group
- Specific Needs: Access to better healthcare and agricultural training

- Profile 2: Moussa Ibrahim
- Name: Moussa Ibrahim
- Age: 45
- Gender: Male
- Marital Status: Widowed
- Number of Dependents: 2 (both children)
- Location: Maradi Region
- Displacement Status: Internally displaced due to conflict
- Health Status: Good, but one child has a disability
- Access to Healthcare: Limited; relies on local healers
- Education Level: Secondary education (incomplete)
- Employment Status: Part-time herder
- Income Level: Approximately $150 per year
- Housing Conditions: Temporary shelter made of tarpaulin
- Food Security: Struggles to provide enough food for his family
- Water and Sanitation Access: Access to a communal well
- Social Support Networks: Limited; relies on extended family
- Coping Mechanisms: Engages in small-scale trading
- Cultural Background: Tuareg ethnic group
- Specific Needs: Support for his child's disability and food assistance

- Profile 3: Fatoumata Souley
- Name: Fatoumata Souley
- Age: 28
- Gender: Female
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 sibling)
- Location: Tillabéri Region
- Displacement Status: Not displaced
- Health Status: Healthy, but experiences seasonal allergies
- Access to Healthcare: Moderate; local clinic available
- Education Level: Completed secondary education
- Employment Status: Farmer and market vendor
- Income Level: Approximately $300 per year
- Housing Conditions: Simple house with access to basic amenities
- Food Security: Generally secure, but relies on seasonal crops
- Water and Sanitation Access: Access to a well with clean water
- Social Support Networks: Active in community groups
- Coping Mechanisms: Savings group participation
- Cultural Background: Fulani ethnic group
- Specific Needs: Training in sustainable farming practices

- Profile 4: Ibrahim Adamou
- Name: Ibrahim Adamou
- Age: 50
- Gender: Male
- Marital Status: Married
- Number of Dependents: 6 (5 children, 1 elderly parent)
- Location: Agadez Region
- Displacement Status: Not displaced
- Health Status: Chronic back pain
- Access to Healthcare: Limited; must travel to the nearest town
- Education Level: No formal education
- Employment Status: Full-time herder
- Income Level: Approximately $400 per year
- Housing Conditions: Traditional tent structure
- Food Security: Generally secure, but faces challenges during droughts
- Water and Sanitation Access: Access to a seasonal river
- Social Support Networks: Strong family and clan ties
- Coping Mechanisms: Shares resources with neighbors
- Cultural Background: Beri-Beri ethnic group
- Specific Needs: Access to healthcare for chronic pain management

- Profile 5: Salima Mahamadou
- Name: Salima Mahamadou
- Age: 32
- Gender: Female
- Marital Status: Single
- Number of Dependents: 1 (a young child)
- Location: Dosso Region
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced postpartum complications
- Access to Healthcare: Moderate; local health post available, but often lacks supplies
- Education Level: Completed primary education
- Employment Status: Small-scale farmer and artisan (weaver)
- Income Level: Approximately $250 per year
- Housing Conditions: Simple mud-brick house with a thatched roof
- Food Security: Faces food insecurity during the lean season
- Water and Sanitation Access: Access to a nearby river, but sanitation facilities are inadequate
- Social Support Networks: Active in a women's cooperative for artisans
- Coping Mechanisms: Participates in community barter systems and savings groups
- Cultural Background: Zarma ethnic group
- Specific Needs: Access to maternal health services and training in sustainable farming techniques

- Profile 6: Abdoulaye Kone
- Name: Abdoulaye Kone
- Age: 40
- Gender: Male
- Marital Status: Married
- Number of Dependents: 5 (4 children, 1 elderly uncle)
- Location: Tahoua Region
- Displacement Status: Not displaced
- Health Status: Generally healthy, but suffers from occasional malaria
- Access to Healthcare: Limited; relies on traditional medicine for minor ailments
- Education Level: Incomplete primary education
- Employment Status: Full-time farmer and part-time herder
- Income Level: Approximately $350 per year
- Housing Conditions: Traditional house made of mud with a thatched roof
- Food Security: Generally secure, but struggles during drought years
- Water and Sanitation Access: Access to a community well, but water is often scarce
- Social Support Networks: Strong ties with extended family and local community
- Coping Mechanisms: Engages in seasonal migration for work
- Cultural Background: Songhai ethnic group
- Specific Needs: Access to agricultural training and improved water sources

- Profile 7: Mariama Tchana
- Name: Mariama Tchana
- Age: 27
- Gender: Female
- Marital Status: Divorced
- Number of Dependents: 2 (both children)
- Location: Niamey Region
- Displacement Status: Not displaced
- Health Status: Healthy, but has limited access to reproductive health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Secondary education (completed)
- Employment Status: Market vendor and part-time farmer
- Income Level: Approximately $200 per year
- Housing Conditions: Small rented room in a communal setting
- Food Security: Faces food insecurity, especially during the rainy season
- Water and Sanitation Access: Access to a public tap, but sanitation facilities are poor
- Social Support Networks: Limited; relies on friends and neighbors for support
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Hausa ethnic group
- Specific Needs: Access to microfinance and vocational training

- Profile 8: Oumarou Sani
- Name: Oumarou Sani
- Age: 55
- Gender: Male
- Marital Status: Married
- Number of Dependents: 7 (6 children, 1 elderly mother)
- Location: Diffa Region
- Displacement Status: Internally displaced due to regional conflict
- Health Status: Chronic hypertension
- Access to Healthcare: Limited; must travel to a distant clinic for treatment
- Education Level: No formal education
- Employment Status: Full-time herder
- Income Level: Approximately $300 per year
- Housing Conditions: Temporary shelter made of plastic sheeting
- Food Security: Struggles to provide enough food for his family
- Water and Sanitation Access: Access to a nearby river, but sanitation is inadequate
- Social Support Networks: Limited; relies on fellow displaced individuals
- Coping Mechanisms: Engages in communal farming efforts
- Cultural Background: Kanuri ethnic group
- Specific Needs: Food assistance and access to healthcare for chronic conditions

- Profile 9: Hawa Aboubakar
- Name: Hawa Aboubakar
- Age: 30
- Gender: Female
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 disabled sibling)
- Location: Agadez Region
- Displacement Status: Not displaced
- Health Status: Generally healthy, but her sibling requires special care
- Access to Healthcare: Moderate; local health center available but often lacks resources
- Education Level: Completed primary education
- Employment Status: Farmer and craftsperson (pottery)
- Income Level: Approximately $280 per year
- Housing Conditions: Simple mud-brick house with basic amenities
- Food Security: Generally secure, but faces challenges during the dry season
- Water and Sanitation Access: Access to a borehole with clean water
- Social Support Networks: Active in local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Tuareg ethnic group
- Specific Needs: Access to training in sustainable pottery techniques and support for her sibling's care

- Profile 10: Souleymane Mahamane
- Name: Souleymane Mahamane
- Age: 38
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly aunt)
- Location: Dosso Region
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional gastrointestinal issues
- Access to Healthcare: Moderate; local clinic available but often lacks medications
- Education Level: Incomplete secondary education
- Employment Status: Full-time farmer and part-time trader
- Income Level: Approximately $400 per year
- Housing Conditions: Traditional house with a thatched roof and a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a nearby well with clean water
- Social Support Networks: Strong community ties; involved in local agricultural cooperatives
- Coping Mechanisms: Engages in crop diversification and shares resources with neighbors
- Cultural Background: Zarma ethnic group
- Specific Needs: Access to agricultural training and improved market access for his products
- Profile 1: Ravi Kumar
- Name: Ravi Kumar
- Age: 40
- Gender: Male
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 elderly parent)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has high blood pressure
- Access to Healthcare: Moderate; local clinic available but often lacks medications
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (rice and vegetables)
- Income Level: Approximately ₹1,00,000 per year
- Housing Conditions: Simple mud house with a thatched roof
- Food Security: Generally secure, but faces challenges during droughts
- Water and Sanitation Access: Access to a borewell, but water quality is sometimes poor
- Social Support Networks: Active in a local farmers' cooperative
- Coping Mechanisms: Engages in crop rotation and shares resources with neighbors
- Cultural Background: Tamil
- Specific Needs: Access to agricultural training and improved irrigation techniques
- 
- Profile 2: Lakshmi Devi
- Name: Lakshmi Devi
- Age: 35
- Gender: Female
- Marital Status: Widowed
- Number of Dependents: 2 (both children)
- Location: Karnataka
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced stress-related issues
- Access to Healthcare: Limited; relies on local health services that are often overcrowded
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (millets and pulses)
- Income Level: Approximately ₹80,000 per year
- Housing Conditions: Small concrete house with basic amenities
- Food Security: Faces food insecurity, especially during the lean season
- Water and Sanitation Access: Access to a community well, but sanitation facilities are inadequate
- Social Support Networks: Active in a women's self-help group
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Kannada
- Specific Needs: Access to microfinance and training in sustainable farming practices
- 
- Profile 3: Arjun Nair
- Name: Arjun Nair
- Age: 50
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly mother)
- Location: Kerala
- Displacement Status: Not displaced
- Health Status: Chronic back pain
- Access to Healthcare: Moderate; must travel to the nearest town for treatment
- Education Level: Incomplete primary education
- Employment Status: Small-scale farmer (coconut and rubber)
- Income Level: Approximately ₹1,20,000 per year
- Housing Conditions: Traditional house made of wood with a tiled roof
- Food Security: Generally secure, but faces challenges during crop failures
- Water and Sanitation Access: Access to a nearby river, but sanitation is poor
- Social Support Networks: Strong ties with local farming community
- Coping Mechanisms: Engages in communal farming efforts
- Cultural Background: Malayali
- Specific Needs: Access to healthcare for chronic pain management and agricultural training
- 
- Profile 4: Meera Reddy
- Name: Meera Reddy
- Age: 28
- Gender: Female
- Marital Status: Married
- Number of Dependents: 1 (a young child)
- Location: Andhra Pradesh
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to maternal health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (vegetables and fruits)
- Income Level: Approximately ₹70,000 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Telugu
- Specific Needs: Access to maternal health services and training in sustainable agricultural practices
- 
- Profile 5: Suresh Babu
- Name: Suresh Babu
- Age: 45
- Gender: Male
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 elderly father)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional digestive issues
- Access to Healthcare: Moderate; local health center available but often lacks resources
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (sugarcane and vegetables)
- Income Level: Approximately ₹1,50,000 per year
- Housing Conditions: Simple brick house with a small farm
- Food Security: Generally secure, but faces challenges during the monsoon season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in a local farmers' association
- Coping Mechanisms: Engages in crop diversification and shares resources with neighbors
- Cultural Background: Tamil
- Specific Needs: Access to agricultural training and improved market access for his products
- 
- Profile 6: Anjali Menon
- Name: Anjali Menon
- Age: 32
- Gender: Female
- Marital Status: Single
- Number of Dependents: 1 (a young child)
- Location: Kerala
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to childcare services
- Access to Healthcare: Good; local health services available
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (spices and fruits)
- Income Level: Approximately ₹90,000 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the harvest season
- Water and Sanitation Access: Access to a well with clean water
- Social Support Networks: Active in a local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Malayali
- Specific Needs: Access to microfinance and training in sustainable agricultural practices
- 
- Profile 7: Karthik Reddy
- Name: Karthik Reddy
- Age: 38
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly mother)
- Location: Andhra Pradesh
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has chronic knee pain
- Access to Healthcare: Limited; must travel to the nearest town for treatment
- Education Level: Incomplete primary education
- Employment Status: Small-scale farmer (paddy and groundnuts)
- Income Level: Approximately ₹1,00,000 per year
- Housing Conditions: Traditional house made of mud with a thatched roof
- Food Security: Generally secure, but faces challenges during crop failures
- Water and Sanitation Access: Access to a nearby river, but sanitation is poor
- Social Support Networks: Strong ties with local farming community
- Coping Mechanisms: Engages in communal farming efforts
- Cultural Background: Telugu
- Specific Needs: Access to healthcare for knee pain management and agricultural training
- 
- Profile 8: Priya Nair
- Name: Priya Nair
- Age: 30
- Gender: Female
- Marital Status: Married
- Number of Dependents: 2 (both children)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to reproductive health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (vegetables and fruits)
- Income Level: Approximately ₹70,000 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in local women's groups focused on agriculture
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Malayali
- Specific Needs: Access to maternal health services and training in sustainable agricultural practices
- 
- Profile 9: Sanjay Pillai
- Name: Sanjay Pillai
- Age: 46
- Gender: Male
- Marital Status: Married
- Number of Dependents: 5 (4 children, 1 elderly mother)
- Location: Karnataka
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional headaches
- Access to Healthcare: Moderate; local health center available but often lacks resources
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (sugarcane and vegetables)
- Income Level: Approximately ₹1,30,000 per year
- Housing Conditions: Simple brick house with a small farm
- Food Security: Generally secure, but faces challenges during the monsoon season
- Water and Sanitation Access: Access to a borewell with clean water
- Social Support Networks: Active in a local farmers' association
- Coping Mechanisms: Engages in crop diversification and shares resources with neighbors
- Cultural Background: Kannada
- Specific Needs: Access to agricultural training and improved market access for his products
- 
- Profile 10: Kavita Sharma
- Name: Kavita Sharma
- Age: 34
- Gender: Female
- Marital Status: Divorced
- Number of Dependents: 2 (both children)
- Location: Tamil Nadu
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced stress-related issues
- Access to Healthcare: Limited; relies on local health services that are often overcrowded
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (pulses and vegetables)
- Income Level: Approximately ₹60,000 per year
- Housing Conditions: Small concrete house with basic amenities
- Food Security: Faces food insecurity, especially during the lean season
- Water and Sanitation Access: Access to a community well, but sanitation facilities are inadequate
- Social Support Networks: Active in a women's self-help group
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Tamil
- Specific Needs: Access to microfinance and training in sustainable farming practices
- Profile 1: Juan Carlos Mendoza
- Name: Juan Carlos Mendoza
- Age: 42
- Gender: Male
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 elderly parent)
- Location: Cuzco Region, Peru
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has high blood pressure
- Access to Healthcare: Limited; nearest clinic is 10 km away
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (potatoes and corn)
- Income Level: Approximately $1,500 per year
- Housing Conditions: Simple adobe house with a thatched roof
- Food Security: Generally secure, but faces challenges during the rainy season
- Water and Sanitation Access: Access to a community spring, but sanitation facilities are basic
- Social Support Networks: Active in a local farmers' cooperative
- Coping Mechanisms: Engages in barter trade with neighbors
- Cultural Background: Quechua ethnic group
- Specific Needs: Access to agricultural training and improved irrigation techniques

- Profile 2: Maria Elena Torres
- Name: Maria Elena Torres
- Age: 35
- Gender: Female
- Marital Status: Single
- Number of Dependents: 2 (both children)
- Location: Veracruz, Mexico
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced postpartum complications
- Access to Healthcare: Moderate; local health center available
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (coffee and vegetables)
- Income Level: Approximately $1,200 per year
- Housing Conditions: Small house made of concrete blocks
- Food Security: Faces food insecurity, especially during the dry season
- Water and Sanitation Access: Access to a well, but sanitation facilities are inadequate
- Social Support Networks: Active in a women's agricultural group
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Mestizo
- Specific Needs: Access to microfinance and training in sustainable farming practices

- Profile 3: Pedro Alvarado
- Name: Pedro Alvarado
- Age: 50
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly mother)
- Location: Antioquia, Colombia
- Displacement Status: Not displaced
- Health Status: Chronic back pain
- Access to Healthcare: Limited; must travel to the nearest town for treatment
- Education Level: Incomplete primary education
- Employment Status: Small-scale farmer (cacao and bananas)
- Income Level: Approximately $1,000 per year
- Housing Conditions: Traditional wooden house with a tin roof
- Food Security: Generally secure, but faces challenges during crop failures
- Water and Sanitation Access: Access to a river, but sanitation is poor
- Social Support Networks: Strong ties with local farming community
- Coping Mechanisms: Engages in communal farming efforts
- Cultural Background: Afro-Colombian
- Specific Needs: Access to healthcare for chronic pain management and agricultural training

- Profile 4: Lucia Rojas
- Name: Lucia Rojas
- Age: 29
- Gender: Female
- Marital Status: Married
- Number of Dependents: 1 (a young child)
- Location: Santa Cruz, Bolivia
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to maternal health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (quinoa and vegetables)
- Income Level: Approximately $800 per year
- Housing Conditions: Simple adobe house with a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a community well with clean water
- Social Support Networks: Active in local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Quechua ethnic group
- Specific Needs: Access to training in sustainable farming techniques and support for her child's education

- Profile 5: Esteban López
- Name: Esteban López
- Age: 39
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly aunt)
- Location: La Paz, Bolivia
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional digestive issues
- Access to Healthcare: Moderate; local health post available but often lacks supplies
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (maize and potatoes)
- Income Level: Approximately $1,100 per year
- Housing Conditions: Simple adobe house with a small plot for farming
- Food Security: Generally secure, but faces challenges during the dry season
- Water and Sanitation Access: Access to a community well with clean water
- Social Support Networks: Active in a local farmers' association
- Coping Mechanisms: Engages in crop rotation and shares resources with neighbors
- Cultural Background: Aymara ethnic group
- Specific Needs: Access to agricultural training and improved irrigation techniques

- Profile 6: Mariana Castillo
- Name: Mariana Castillo
- Age: 27
- Gender: Female
- Marital Status: Single
- Number of Dependents: 1 (a young child)
- Location: Oaxaca, Mexico
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to maternal health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (corn and beans)
- Income Level: Approximately $800 per year
- Housing Conditions: Small house made of adobe with a thatched roof
- Food Security: Faces food insecurity, especially during the rainy season
- Water and Sanitation Access: Access to a nearby river, but sanitation facilities are poor
- Social Support Networks: Active in a women's cooperative
- Coping Mechanisms: Participates in local savings groups
- Cultural Background: Zapotec
- Specific Needs: Access to microfinance and training in sustainable farming practices

- Profile 7: Felipe Vargas
- Name: Felipe Vargas
- Age: 45
- Gender: Male
- Marital Status: Married
- Number of Dependents: 3 (2 children, 1 elderly mother)
- Location: San José, Costa Rica
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has high cholesterol
- Access to Healthcare: Good; local health services available
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (coffee and fruits)
- Income Level: Approximately $1,500 per year
- Housing Conditions: Simple wooden house with a small garden
- Food Security: Generally secure, but faces challenges during crop failures
- Water and Sanitation Access: Access to a well with clean water
- Social Support Networks: Strong ties with local farming community
- Coping Mechanisms: Engages in community farming initiatives
- Cultural Background: Mestizo
- Specific Needs: Access to healthcare for cholesterol management and agricultural training

- Profile 8: Rosa Elena Paredes
- Name: Rosa Elena Paredes
- Age: 33
- Gender: Female
- Marital Status: Divorced
- Number of Dependents: 2 (both children)
- Location: Quito, Ecuador
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has experienced anxiety
- Access to Healthcare: Limited; relies on local health services that are often overcrowded
- Education Level: Completed primary education
- Employment Status: Small-scale farmer (vegetables and herbs)
- Income Level: Approximately $900 per year
- Housing Conditions: Simple house with a small garden
- Food Security: Generally secure, but faces challenges during the lean season
- Water and Sanitation Access: Access to a nearby stream, but sanitation facilities are inadequate
- Social Support Networks: Active in a local women's group focused on agriculture
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Indigenous Kichwa
- Specific Needs: Access to mental health services and training in sustainable farming practices

- Profile 9: Javier Morales
- Name: Javier Morales
- Age: 37
- Gender: Male
- Marital Status: Married
- Number of Dependents: 4 (3 children, 1 elderly aunt)
- Location: Chiapas, Mexico
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has occasional respiratory issues
- Access to Healthcare: Limited; local clinic available but often lacks resources
- Education Level: Incomplete secondary education
- Employment Status: Small-scale farmer (coffee and maize)
- Income Level: Approximately $1,000 per year
- Housing Conditions: Traditional wooden house with a thatched roof
- Food Security: Generally secure, but faces challenges during the rainy season
- Water and Sanitation Access: Access to a community well, but sanitation facilities are poor
- Social Support Networks: Strong ties with local farming community and cooperatives
- Coping Mechanisms: Engages in crop diversification and shares resources with neighbors
- Cultural Background: Indigenous Tzotzil
- Specific Needs: Access to agricultural training and improved healthcare services

- Profile 10: Camila Fernández
- Name: Camila Fernández
- Age: 29
- Gender: Female
- Marital Status: Single
- Number of Dependents: 1 (a young child)
- Location: Mendoza, Argentina
- Displacement Status: Not displaced
- Health Status: Generally healthy, but has limited access to reproductive health services
- Access to Healthcare: Moderate; local clinic available but often lacks staff
- Education Level: Completed secondary education
- Employment Status: Small-scale farmer (grapes and olives)
- Income Level: Approximately $1,200 per year
- Housing Conditions: Simple adobe house with a small garden
- Food Security: Generally secure, but faces challenges during the harvest season
- Water and Sanitation Access: Access to a well with clean water
- Social Support Networks: Active in a local women's cooperative
- Coping Mechanisms: Participates in community events and shares resources with neighbors
- Cultural Background: Mestizo
- Specific Needs: Access to microfinance and training in sustainable agricultural practices
  `,
  // Add other profiles here
]

// Process all profiles
Promise.all(profiles.map(addProfile)).catch(console.error)