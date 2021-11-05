from django.core.management.base import BaseCommand
from faker import Faker
# import faker.providers
from django.utils.text import slugify
from genres.models import Genre


class Provider():
    
    def spotify_genres(self, col, fake, swrite, style):
        swrite.write(style.SUCCESS("\nSTARTED GENERATING GENRES\n"))
        for i in range(int(col)):
            i+=1
            text= fake['en_US'].text(max_nb_chars=6)
            swrite.write(style.WARNING(f"\n{i}. Start creating"))
            print(f">> '{text}'")
            slug = slugify(text)
            description = fake.text(max_nb_chars=2000)
            genre = Genre.objects.create(name=text, slug=slug, description=description)
            genre.save()
            swrite.write(style.SUCCESS(f"\n{i}. Created"))
            print(f">> '{text}'" )
        check_genres = Genre.objects.all().count()
        swrite.write(style.SUCCESS(f"\nNumber of genres: {check_genres}"))
    

text = """
==============================================
=                      Hello!
= What do you want to generate >

= 1. Genres

= (choose a number)
==============================================
            """  

# calm

class Command(BaseCommand):
    help = "Command information"

    def handle(self, *args, **kwargs):
        fake = Faker(['en_US'])
        swrite = self.stdout
        style=self.style
        
        while True:
            select = input(text)
            if int(select) == 1:
                col_genres = input("How many genres do you want to generate >>>")

                if col_genres.isnumeric():
                    Provider.spotify_genres(self,col=col_genres, fake=fake, swrite=swrite, style=style)
                
                else:
                    self.stdout.write(self.style.ERROR("Not correct"))
            else:
                print("Bye")
                break
                
        

   
   
  
   
    
   