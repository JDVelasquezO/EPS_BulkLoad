from tkinter import *

root = Tk()
root.geometry("900x850")

# this will create a label widget
l1 = Label(root, text = "Primer Label", borderwidth=1, relief="solid")
l2 = Label(root, text = "Second", borderwidth=1, relief="solid")

# grid method to arrange labels in respective
# rows and columns as specified
l1.grid(row = 0, column = 0, sticky = W, pady = 2)
l2.grid(row = 1, column = 0, sticky = W, pady = 2)

# entry widgets, used to take entry from user
e1 = Entry(root)
e2 = Entry(root)

# this will arrange entry widgets
e1.grid(row = 0, column = 1, pady = 2)
e2.grid(row = 1, column = 1, pady = 2)

# checkbutton widget
c1 = Checkbutton(root, text = "Presionar")
c1.grid(row = 2, column = 0, sticky = W, columnspan = 2)

# adding image (remember image should be PNG and not JPG)
img = PhotoImage(file = "./Harpsichord.png")
img1 = img.subsample(2, 2)
label_imagen = Label(root, image = img1)
label_imagen.grid(row = 0, column = 2,
       columnspan = 2, rowspan = 2, padx = 5, pady = 5)

def reducir_tamaño():
    global img
    global label_imagen

    # Reducir el tamaño de la imagen utilizando subsample
    imagen_reducida = img.subsample(3, 3)
    label_imagen.config(image=imagen_reducida)
    label_imagen.image = imagen_reducida  # Mantener la referencia a la imagen


# button widget
b1 = Button(root, text = "Zoom +")
b2 = Button(root, text = "Zoom -", command=reducir_tamaño)

b1.grid(row = 2, column = 2, sticky = E)
b2.grid(row = 2, column = 3, sticky = E)
mainloop()
