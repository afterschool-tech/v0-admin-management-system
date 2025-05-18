type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast(props: ToastProps) {
  // In a real implementation, this would show a toast notification
  console.log("TOAST:", props.title, props.description)

  // For now, we'll just use an alert for demonstration purposes
  alert(`${props.title}: ${props.description}`)
}
