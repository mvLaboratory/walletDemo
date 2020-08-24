#$registryName = 'walletCR'
#$loginServer = az acr show -n $registryName --query loginServer --output tsv 
#az acr login -n $registryName   
#docker build -t wallet-fe .
#docker tag wallet-fe:latest walletcr.azurecr.io/wallet-fe:0.0.9
#docker push $loginServer/wallet-fe:0.0.9


az login
$imagename  = 'walletfeimage'
$resourceGroup = 'walletDevelop'
$registryname  = 'walletfecr'
$appServicePlan  = 'walletfe-app-plan'
$appName  = 'app-wallet'

docker build --tag $imagename .  

#  $containerGuid = docker run -d -p 3000:3000 $imagename --name "$($imagename)container"
#  docker stop $containerGuid

#az group create --name $resourceGroup --location francecentral
az acr create --name $registryname --resource-group $resourceGroup --sku Basic --admin-enabled true

$acrUserName = az acr credential show --resource-group $resourceGroup -n $registryname --query username -o tsv
$acrPassword = az acr credential show --resource-group $resourceGroup -n $registryname --query passwords[1].value -o tsv
docker login "$($registryname).azurecr.io" --username $acrUserName -p $acrPassword

$containerName  = "$($registryname).azurecr.io/$($imagename):latest"
docker tag $imagename $containerName 
docker push $containerName 

az acr repository list -n $registryname
az appservice plan create --name $appServicePlan --resource-group $resourceGroup --is-linux --sku B1


az webapp create --name $appName --resource-group $resourceGroup --plan $appServicePlan --deployment-container-image-name $containerName
az webapp config appsettings set --resource-group $resourceGroup --name $appName --settings WEBSITES_PORT=3000
$principalId  = az webapp identity assign --resource-group $resourceGroup --name $appName --query principalId --output tsv
$subscriptionId = az account show --query id --output tsv
az role assignment create --assignee $principalId --scope "/subscriptions/$($subscriptionId)/resourceGroups/$($resourceGroup)/providers/Microsoft.ContainerRegistry/registries/$($registryname)" --role "AcrPull"
az webapp config container set --name $appName --resource-group $resourceGroup --docker-custom-image-name $containerName --docker-registry-server-url "https://$($registryname).azurecr.io"