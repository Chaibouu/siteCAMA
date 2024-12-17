
export async function getAllNiveaux() {
    try {
      const response = await fetch(`/api/niveau`, {
        method: "GET",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération des niveaux");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
 
export async function createNiveau(name: string) {
    try {
      const response = await fetch(`/api/niveau`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création du niveau");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

export async function getNiveau(id: string) {
    try {
      const response = await fetch(`/api/niveau/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération du niveau");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function updateNiveau(id: string, name: string) {
    try {
      const response = await fetch(`/api/niveau/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la mise à jour du niveau");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function deleteNiveau(id: string) {
    try {
      const response = await fetch(`/api/niveau/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la suppression du niveau");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

// utilisation 
// getNiveau("123")
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

  
  