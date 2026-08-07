from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def ReserveTableApiView(request):
    """API endpoint to receive table reservations or pre-orders."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except Exception:
            data = request.POST
            
        name = data.get('name', 'Guest')
        branch = data.get('branch', 'Nadipur')
        return JsonResponse({'status': 'success', 'message': f'Reservation received for {name} at {branch}.'})
        
    return JsonResponse({'status': 'info', 'message': 'Submit reservation via POST.'})
