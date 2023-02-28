# Mio-React

För att lösa problemet med att APIt har två NULL värden så har jag gått in i Backenden som kom med i utmaningen och tagit bort de två produkterna med ID=NULL.
Utan detta så kommer API bli korrupt så snart det stöter på NULL värden och alla produkter efter det första null värdet blir felaktiga och går inte att klicka in på. 

Jag har försökt skriva kod som raderar dessa produkter via FETCH, men har inte fått till det. Så jag gick alltså istället in manuellt och raderade dessa två produkter. jag inser att det kanske inte är den lösning ni var ute efter men det känns ändå som en realistisk metod. Man vill ju helst inte ha några filer i databasen som inte lever upp till kraven, som ID required i detta fallet. 


För att det skall funka ordentligt när ni kör min kod kan ni uppdatera er DB.json med den db.json fil jag inkluderar här på  git. 
