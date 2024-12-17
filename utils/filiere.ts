
export async function getAllFilieres() {
    try {
      const response = await fetch(`/api/filiere`, {
        method: "GET",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération des filières");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
 
export async function createFiliere(name: string) {
    try {
      const response = await fetch(`/api/filiere`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création de la filière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

export async function getFiliere(id: string) {
    try {
      const response = await fetch(`/api/filiere/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération de la filière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function updateFiliere(id: string, name: string) {
    try {
      const response = await fetch(`/api/filiere/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la mise à jour de la filière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function deleteFiliere(id: string) {
    try {
      const response = await fetch(`/api/filiere/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la suppression de la filière");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

// utilisation 
// getFiliere("123")
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

  
  