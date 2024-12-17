
export async function getAllRegimes() {
    try {
      const response = await fetch(`/api/regime`, {
        method: "GET",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération des regimes");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
 
export async function createRegime(name: string) {
    try {
      const response = await fetch(`/api/regime`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création du régime");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

export async function getRegime(id: string) {
    try {
      const response = await fetch(`/api/regime/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération du régime");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function updateRegime(id: string, name: string) {
    try {
      const response = await fetch(`/api/regime/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la mise à jour du régime");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function deleteRegime(id: string) {
    try {
      const response = await fetch(`/api/regime/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la suppression du régime");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

// utilisation 
// getRegime("123")
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

  
  