
export async function getAllMatiere() {
    try {
      const response = await fetch(`/api/matiere`, {
        method: "GET",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération des matières");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
 
export async function createMatiere(name: string) {
    try {
      const response = await fetch(`/api/matiere`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création de la matière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

export async function getMatiere(id: string) {
    try {
      const response = await fetch(`/api/matiere/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération de la matière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function updateMatiere(id: string, name: string) {
    try {
      const response = await fetch(`/api/matiere/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la mise à jour de la matière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function deleteMatiere(id: string) {
    try {
      const response = await fetch(`/api/matiere/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la suppression de la matière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

// utilisation 
// getMatiere("123")
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

  
  