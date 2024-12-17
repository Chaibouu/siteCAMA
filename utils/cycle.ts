
export async function getAllCycles() {
    try {
      const response = await fetch(`/api/cycle`, {
        method: "GET",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération des cycles");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
 
export async function createCycle(name: string) {
    try {
      const response = await fetch(`/api/cycle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la création du cycle");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

export async function getCycle(id: string) {
    try {
      const response = await fetch(`/api/cycle/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la récupération du cycle");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function updateCycle(id: string, name: string) {
    try {
      const response = await fetch(`/api/cycle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la mise à jour du cycles");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export async function deleteCycle(id: string) {
    try {
      const response = await fetch(`/api/cycle/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la suppression du cycles");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  

// utilisation 
// getCycle("123")
//   .then(data => console.log(data))
//   .catch(err => console.error(err));

  
  