import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Initial Seed Data (Fallbacks if Firebase is empty)
import { experience as seedExperience } from '../data/experience';
import { projects as seedProjects } from '../data/projects';
import { skills as seedSkills, toolsWithIcons as seedTools, education as seedEdu } from '../data/skills';
import { certifications as seedCerts } from '../data/certifications';
import { blogPosts as seedBlogs } from '../data/blog';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({
    hero: {
      name: 'Vivek Kumar',
      roles: 'Full Stack Developer, MERN Stack Developer, React Developer',
      bio: 'I\'m a passionate Full Stack Developer with expertise in building scalable web applications. I love turning complex problems into simple, beautiful, and intuitive designs.',
      email: 'hello@vivekkumar.com',
      github: 'https://github.com/Vibush01',
      linkedin: 'https://linkedin.com/in/vibush01'
    },
    experience: seedExperience,
    projects: seedProjects,
    skills: seedSkills,
    tools: seedTools,
    education: seedEdu,
    certifications: seedCerts,
    blog: seedBlogs,
    stats: {
      views: 1248
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Safety timeout: if Firebase doesn't connect in 3 seconds, show offline data
    const timeout = setTimeout(() => {
      console.warn("Firebase connection timeout or missing config. Using local seed data.");
      setError("Running in offline mode.");
      setLoading(false);
    }, 3000);

    // Real-time listener for the portfolio data
    const docRef = doc(db, 'portfolio', 'data');
    
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      clearTimeout(timeout); // Connected successfully!
      
      if (docSnap.exists()) {
        setData(docSnap.data());
        setLoading(false);
      } else {
        // Document doesn't exist yet, seed it with initial static data
        try {
          console.log("No Firebase data found. Seeding initial data...");
          await setDoc(docRef, data);
          setLoading(false);
        } catch (err) {
          console.error("Error seeding initial data:", err);
          setError("Failed to connect to database. Showing offline data.");
          setLoading(false);
        }
      }
    }, (err) => {
      clearTimeout(timeout);
      console.error("Firestore Error:", err);
      setError("Failed to connect to database. Showing offline data.");
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Global update function for the CMS
  const updateData = async (section, newData) => {
    try {
      const docRef = doc(db, 'portfolio', 'data');
      await setDoc(docRef, { [section]: newData }, { merge: true });
      return { success: true };
    } catch (err) {
      console.error(`Error updating ${section}:`, err);
      return { success: false, error: err.message };
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, error, updateData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
